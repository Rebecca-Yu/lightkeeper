# ==================================================
# Convert all XLSX files to JavaScript data files
# Output: .\js\<WorkbookName>.js
# Creates: const QUESTIONS = [...]
# ==================================================

$jsFolder = Join-Path $PSScriptRoot "js"

if (!(Test-Path $jsFolder)) {
    New-Item -ItemType Directory -Path $jsFolder | Out-Null
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

Get-ChildItem -Path $PSScriptRoot -Filter *.xlsx | ForEach-Object {

    Write-Host "Converting $($_.Name)..."

    $wb = $excel.Workbooks.Open($_.FullName)
    $ws = $wb.Worksheets.Item(1)

    $rows = $ws.UsedRange.Rows.Count
    $cols = $ws.UsedRange.Columns.Count

    # Store headers in an array to preserve exact Excel order
    $headers = @()

    for ($c = 1; $c -le $cols; $c++) {
        $header = [string]$ws.Cells.Item(1, $c).Text
        $headers += $header.Trim()
    }

    $data = @()

    # Read rows
    for ($r = 2; $r -le $rows; $r++) {

        $obj = [ordered]@{}
        $hasData = $false

        for ($c = 1; $c -le $cols; $c++) {

            $header = $headers[$c - 1]

            # Skip blank headers
            if ([string]::IsNullOrWhiteSpace($header)) {
                continue
            }

            $value = [string]$ws.Cells.Item($r, $c).Text

            # Skip blank values
            if ([string]::IsNullOrWhiteSpace($value)) {
                continue
            }

            $obj[$header] = $value
            $hasData = $true
        }

        if ($hasData) {
            $data += $obj
        }
    }

    # Convert to JSON
    $json = $data | ConvertTo-Json -Depth 20

    # Wrap as JavaScript
    $jsContent = @"
const QUESTIONS = $json;
"@

    $jsFile = Join-Path $jsFolder ($_.BaseName + ".js")

    Set-Content `
        -Path $jsFile `
        -Value $jsContent `
        -Encoding UTF8

    $wb.Close($false)

    Write-Host "Created $jsFile"
}

$excel.Quit()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

[GC]::Collect()
[GC]::WaitForPendingFinalizers()

Write-Host ""
Write-Host "=============================="
Write-Host " All XLSX files converted"
Write-Host " Output folder: js"
Write-Host "=============================="

Pause