const QUESTIONS = [
    {
        "saint":  "Confucius",
        "chinese":  "孔子",
        "clue1":  "I am associated with ancient China.",
        "clue2":  "I am primarily known as a teacher, philosopher, and paragon of Chinese sages.",
        "clue3":  "I advocate for social harmony, and virtuous governance",
        "clue4":  "I travelled between different states of ancient China, sharing and promoting my ideas.",
        "clue5":  "My teachings became the foundation of Confucianism."
    },
    {
        "saint":  "Mencius",
        "chinese":  "孟子",
        "clue1":  "I am associated with ancient China.",
        "clue2":  "I am known as a teacher, and philosopher.",
        "clue3":  "I believe that good leadership should care for the wellbeing of ordinary people.",
        "clue4":  "I argued that human nature is inherently good",
        "clue5":  "I am known as the \"Second Sage\" after Confucius."
    },
    {
        "saint":  "Yan Hui",
        "chinese":  "颜回",
        "clue1":  "I am associated with ancient China.",
        "clue2":  "I am known primarily as a student.",
        "clue3":  "I am deeply dedicated to learning.",
        "clue4":  "I am praised for my humility despite my abilities.",
        "clue5":  "I am one of Confucius\u0027 most respected disciples."
    },
    {
        "saint":  "Gautama Buddha",
        "chinese":  "釋迦牟尼佛",
        "clue1":  "I was born in ancient Asia.",
        "clue2":  "I was born into a wealthy privileged family.",
        "clue3":  "I renounced my luxurious life in search of answers.",
        "clue4":  "I dedicated my existence to understanding the root of human suffering and how to overcome it.",
        "clue5":  "I became known as the \"Awakened One\", founder of Buddhism."
    },
    {
        "saint":  "Guanyin",
        "chinese":  "觀音",
        "clue1":  "I am especially popular in East Asian traditions.",
        "clue2":  "I am strongly associated with compassion.",
        "clue3":  "People traditionally turn to me when seeking healing or protection.",
        "clue4":  "I am often depicted with holding a vase with a willow branch",
        "clue5":  "I am known as the bodhisattva of compassion and the goddess of mercy."
    },
    {
        "saint":  "Dalai Lama",
        "chinese":  "達賴喇嘛",
        "clue1":  "I am a Buddhist religious figure.",
        "clue2":  "I was awarded the Nobel Peace Prize in 1989",
        "clue3":  "I have spent much of my life living outside Tibet.",
        "clue4":  "I became known internationally for speaking about peace and compassion.",
        "clue5":  "I am known as the 14th spiritual ruler of Tibet Buddhism."
    },
    {
        "saint":  "Laozi",
        "chinese":  "老子",
        "clue1":  "I am associated with ancient China.",
        "clue2":  "I am connected with a philosophy that values harmony and simplicity.",
        "clue3":  "I advocate balance and living in accordance with the natural course of the universe.",
        "clue4":  "I am traditionally regarded as the author of the Tao Te Ching.",
        "clue5":  "I am the founder of philosophical Taoism."
    },
    {
        "saint":  "Socrates",
        "chinese":  "蘇格拉底",
        "clue1":  "I am associated with ancient Greece.",
        "clue2":  "I was known for teaching through conversation.",
        "clue3":  "I shifted Greek philosophy away from physical science and towards question sof ethics and virtues",
        "clue4":  "I was sentenced to death by the city of Athens on the charge of impiety and corrupting the youth.",
        "clue5":  "I created a system of questions and answers to simulate critical thinking; called \"The Socratic Method\""
    },
    {
        "saint":  "Plato",
        "chinese":  "柏拉圖",
        "clue1":  "I am associated with ancient Greece.",
        "clue2":  "I was taught and is influenced by another famous Greek philosopher.",
        "clue3":  "I wrote extensive dialogues exploring ethics, justice and politics, using my teacher as the main character",
        "clue4":  "I am the teacher of Aristotle.",
        "clue5":  "I established an important school of philosophy in Athens, now known as the \"Platonic Academy\"."
    },
    {
        "saint":  "Jesus Christ",
        "chinese":  "耶穌基督",
        "clue1":  "I am known as a teacher.",
        "clue2":  "I frequently taught through parables.",
        "clue3":  "I preached about God\u0027s kingdom, loving your neighbour, forgiving others, and showing compassion to the poor and outcasts.",
        "clue4":  "I am famous for performing healing miracles, calming storms, and raising people from the dead.",
        "clue5":  "I am a central figure in Christianity; known as the Messiah."
    },
    {
        "saint":  "Saint Mary",
        "chinese":  "聖母瑪利亞",
        "clue1":  "I am from the beginning of the Common Era.",
        "clue2":  "I am of Jewish origin, lived my early life in a town called Nazareth",
        "clue3":  "I am a revered figure in Christianity and Islam.",
        "clue4":  "I am closely associated with one of Christianity\u0027s central figures.",
        "clue5":  "I am traditionally known as the mother of Jesus."
    },
    {
        "saint":  "Mother Teresa",
        "chinese":  "德蕾莎修女",
        "clue1":  "I am a Catholic religious figure who devoted my life to helping others.",
        "clue2":  "I became known for caring for people who were poor, sick, and dying.",
        "clue3":  "I spent much of my life carrying out this work in India.",
        "clue4":  "I was awarded the Nobel Peace Prize in 1979.",
        "clue5":  "I founded the Missionaries of Charity, a congregation of nuns known for its work caring for the poorest and most vulnerable."
    },
    {
        "saint":  "Moses",
        "chinese":  "摩西",
        "clue1":  "I was raised in the household of a ruler.",
        "clue2":  "My story is largely connected with ancient Egypt.",
        "clue3":  "I am associated with leading a people out of slavery.",
        "clue4":  "I am a foundational prophet and leader in Abrahamic religions.",
        "clue5":  "I received the Ten Commandments from God on Mount Sinai."
    },
    {
        "saint":  "Zhuangzi",
        "chinese":  "莊子",
        "clue1":  "I am associated with ancient China.",
        "clue2":  "I am a philosopher associated with Taoism.",
        "clue3":  "I turned down a high-ranking government position in the state",
        "clue4":  "I valued living naturally and effortlessly in harmony with the Tao, free from societal constraints and ambition.",
        "clue5":  "One of my most famous stories involves dreaming that I was a butterfly."
    },
    {
        "saint":  "Lü Dongbin",
        "chinese":  "呂洞賓",
        "clue1":  "I am a scholar and poet revered across Taoism, folklore and Chinese culture.",
        "clue2":  "I am often depicted carrying a sword.",
        "clue3":  "I am associated with spiritual cultivation and immortality.",
        "clue4":  "I am one of the Eight Immortals.",
        "clue5":  "I am famously associated with a fable about a dream where an entire lifetime of worldly ambition, wealth, and then sudden ruin occurred in the span of time it took to cook yellow millet."
    },
    {
        "saint":  "Prophet Muhammad",
        "chinese":  "穆罕默德",
        "clue1":  "I lived in Arabia around 1500 years ago.",
        "clue2":  "I am a religious teacher who spent my early life in Mecca.",
        "clue3":  "After facing persecution in Mecca, I migrated to Medina and continued establishing a religious community",
        "clue4":  "I received divine revelations which are recorded in the Quran.",
        "clue5":  "I am regarded by Muslims as the final prophet and the founder of Islam."
    },
    {
        "saint":  "St. Nicholas",
        "chinese":  "聖尼古拉",
        "clue1":  "I was once imprisoned and tortured",
        "clue2":  "I lived in Lycia many centuries ago.",
        "clue3":  "I am a Christian religious figure known for my generosity.",
        "clue4":  "I am widely known through stories of secretly helping people in financial difficulty.",
        "clue5":  "I became one of the historical inspirations for Santa Claus."
    },
    {
        "saint":  "St. Francis of Assisi",
        "chinese":  "亞西西的聖方濟各",
        "clue1":  "I came from a wealthy family in Medieval Europe",
        "clue2":  "I renounced worldly goods and family ties to embrace a life of simplicity and poverty",
        "clue3":  "I am the first person in recorded history reported to receive the stigmata, which are the physical wounds of Christ\u0027s crucifixion.",
        "clue4":  "I am the patron saint of animals, ecology, and Italy.",
        "clue5":  "I founded the tradition that became the Franciscan Order."
    },
    {
        "saint":  "Martin Luther King Jr.",
        "chinese":  "馬丁·路德·金",
        "clue1":  "I am from the 20th century.",
        "clue2":  "I am both a religious leader and activist",
        "clue3":  "I advocate nonviolent resistance.",
        "clue4":  "I am best known for my involvement in the American civil rights movement.",
        "clue5":  "I famously delivered the \"I Have a Dream\" speech."
    },
    {
        "saint":  "Joan of Arc",
        "chinese":  "聖女貞德",
        "clue1":  "I am a Catholic religious figure",
        "clue2":  "I believe that divine voices guide me.",
        "clue3":  "I lived during the Middle Ages in France.",
        "clue4":  "I was involved in a major war.",
        "clue5":  "I became a symbol of French resistance during the Hundred Years\u0027 War."
    },
    {
        "saint":  "St. Patrick",
        "chinese":  "聖帕特里克",
        "clue1":  "I lived during the 5th century.",
        "clue2":  "I am a Christian missionary and bishop.",
        "clue3":  "I was kidnapped and enslaved at the age of 16.",
        "clue4":  "I am famously associated with a legend about snakes",
        "clue5":  "I am the patron saint of Ireland"
    },
    {
        "saint":  "Sun Tzu",
        "chinese":  "孫子",
        "clue1":  "I am a philosopher from ancient China.",
        "clue2":  "I am connected with military affairs.",
        "clue3":  "I emphasise the importance of knowing both yourself and others",
        "clue4":  "I believed that careful planning and deception could give an army an advantage.",
        "clue5":  "I am traditionally credited with writing The Art of War."
    },
    {
        "saint":  "Aristotle",
        "chinese":  "亞里士多德",
        "clue1":  "I am associated with ancient Greece.",
        "clue2":  "I was taught and is influenced by another famous Greek philosopher.",
        "clue3":  "I studied and wrote about many different areas of knowledge, including science, politics, and ethics.",
        "clue4":  "I was the tutor of Alexander the Great.",
        "clue5":  "During the middle ages, I was widely known as \"The Philosopher\""
    },
    {
        "saint":  "Ji Gong",
        "chinese":  "濟公",
        "clue1":  "I lived many centuries ago.",
        "clue2":  "I am associated with Chinese Buddhism.",
        "clue3":  "I dedicated my life to protecting the vulnerable, punishing the corrupt, and performing miraculous deeds for ordinary people",
        "clue4":  "I was known for behaving differently from traditional monks.",
        "clue5":  "I am known as the \"Mad Monk\" or the \"Crazy Monk\""
    }
];
