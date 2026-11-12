const QUESTIONS = [
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Emotions are ____, not problems.",
        "clue2-datatype":  "text",
        "answer":  "signals",
        "guess-limit":  "8"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "I am the gps helping you navigate on your journey in life.",
        "clue2-datatype":  "text",
        "answer":  "original nature",
        "guess-limit":  "9"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Remove ____ to break free from the cycle of cause and effect.",
        "clue2-datatype":  "text",
        "answer":  "ignorance",
        "guess-limit":  "9"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "I am the first step to being at peace with your negative emotions",
        "clue2-datatype":  "text",
        "answer":  "acceptance",
        "guess-limit":  "7"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Water contains _____ messages.",
        "clue2-datatype":  "text",
        "answer":  "hidden",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Emotions influence our thoughts, _____, and words.",
        "clue2-datatype":  "text",
        "answer":  "actions",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Ancient chinese scholars identified 7 emotions: joy, anger, disgust, ____, sadness, surprise, happiness.",
        "clue2-datatype":  "text",
        "answer":  "fear",
        "guess-limit":  "7"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "I process your emotions",
        "clue2-datatype":  "text",
        "answer":  "amygdala",
        "guess-limit":  "9"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "The feeling of compassion is the beginning of me.",
        "clue2-datatype":  "text",
        "answer":  "benevolence",
        "guess-limit":  "9"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The feeling of shame and dislike for evil is the beginning of ______.",
        "clue2-datatype":  "text",
        "answer":  "righteousness",
        "guess-limit":  "9"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "The feeling of modesty and yielding is the beginning of me.",
        "clue2-datatype":  "text",
        "answer":  "propriety",
        "guess-limit":  "8"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The sense of right and wrong is the beginning of _____.",
        "clue2-datatype":  "text",
        "answer":  "wisdom",
        "guess-limit":  "7"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "When you understand everything, you will be able to _____ all.",
        "clue2-datatype":  "text",
        "answer":  "forgive",
        "guess-limit":  "8"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "A ___ less resentment in my heart is a _____ more peace and harmony in the world",
        "clue2-datatype":  "text",
        "answer":  "fraction",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "When people are born, their nature is fundamentally ____.",
        "clue2-datatype":  "text",
        "answer":  "good",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The _____ are not confused.",
        "clue2-datatype":  "text",
        "answer":  "wise",
        "guess-limit":  "8"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The voice of conscience may be weak but is always ____.",
        "clue2-datatype":  "text",
        "answer":  "clear",
        "guess-limit":  "7"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "What am I?",
        "clue2":  "I am the emotional part of your brain",
        "clue2-datatype":  "text",
        "answer":  "limbic system",
        "guess-limit":  "10"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The prefrontal cortex centers around _____.",
        "clue2-datatype":  "text",
        "answer":  "logic",
        "guess-limit":  "8"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Dr Masaru Emoto believed that water crystals could be affected by our ________.",
        "clue2-datatype":  "text",
        "answer":  "emotions",
        "guess-limit":  "8"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Teenagers\u0027 brains are still ________, which can affect how they respond to emotions.",
        "clue2-datatype":  "text",
        "answer":  "developing",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "When we are angry, it is important to ________ before reacting.",
        "clue2-datatype":  "text",
        "answer":  "think",
        "guess-limit":  "5"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Understanding our emotions helps us understand ________ better.",
        "clue2-datatype":  "text",
        "answer":  "ourselves",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Compassion is not just about feeling sorry for others. We must also take ________.",
        "clue2-datatype":  "text",
        "answer":  "action",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "We should not blindly follow our friends. We must learn to make our own ________.",
        "clue2-datatype":  "text",
        "answer":  "decisions",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Learning from our mistakes requires us to ________ on our actions.",
        "clue2-datatype":  "text",
        "answer":  "reflect",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Just like a small plant, our virtues need to be nurtured so they can ________.",
        "clue2-datatype":  "text",
        "answer":  "grow",
        "guess-limit":  "5"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "According to The Great Learning, bringing harmony to our ________ is the foundation of a harmonious society.",
        "clue2-datatype":  "text",
        "answer":  "family",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "We should set a good ________ for others through our words and actions.",
        "clue2-datatype":  "text",
        "answer":  "example",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "Someone whose good behaviour inspires others is called a role ________.",
        "clue2-datatype":  "text",
        "answer":  "model",
        "guess-limit":  "7"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "To become a good role model, our actions should match our ________.",
        "clue2-datatype":  "text",
        "answer":  "words",
        "guess-limit":  "7"
    },
    {
        "level":  "NORMAL",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "The way we treat our family members can influence how we treat people in ________.",
        "clue2-datatype":  "text",
        "answer":  "society",
        "guess-limit":  "9"
    },
    {
        "level":  "EASY",
        "score":  "500",
        "clue1":  "Complete this sentence.",
        "clue2":  "A good leader should lead by ________.",
        "clue2-datatype":  "text",
        "answer":  "example",
        "guess-limit":  "9"
    }
];
