'use client'

export type GrammarType = 'subject' | 'object' | 'verb'

export type WordProps = {
    word: string,
    meaning: string,
    grammarType: GrammarType
}

export type ProblemSet = {
    ENText: string,
    JPText: string,
    answer: WordProps,
    incorrects: WordProps[]
}

const subjects: WordProps[] = [
    { word: '猫', meaning: 'cat', grammarType: 'subject' },
    { word: 'お母さん', meaning: 'mom', grammarType: 'subject' },
    { word: '犬', meaning: 'dog', grammarType: 'subject' },
    { word: '先生', meaning: 'teacher', grammarType: 'subject' },
    { word: '友達', meaning: 'friend', grammarType: 'subject' },
    { word: '鳥', meaning: 'bird', grammarType: 'subject' },
    { word: '子供', meaning: 'child', grammarType: 'subject' },
    { word: '学生', meaning: 'student', grammarType: 'subject' },
]

const objects: WordProps[] = [
    { word: '魚', meaning: 'fish', grammarType: 'object' },
    { word: '水', meaning: 'water', grammarType: 'object' },
    { word: '映画', meaning: 'movie', grammarType: 'object' },
    { word: 'パン', meaning: 'bread', grammarType: 'object' },
    { word: '手紙', meaning: 'letter', grammarType: 'object' },
    { word: 'ごはん', meaning: 'rice', grammarType: 'object' },
    { word: '音楽', meaning: 'music', grammarType: 'object' },
    { word: 'ドア', meaning: 'door', grammarType: 'object' },
]

const verbs: WordProps[] = [
    { word: '食べる', meaning: 'eat', grammarType: 'verb' },
    { word: '読む', meaning: 'read', grammarType: 'verb' },
    { word: '話す', meaning: 'speak', grammarType: 'verb' },
    { word: '飲む', meaning: 'drink', grammarType: 'verb' },
    { word: '書く', meaning: 'write', grammarType: 'verb' },
    { word: '歌う', meaning: 'sing', grammarType: 'verb' },
    { word: '買う', meaning: 'buy', grammarType: 'verb' },
    { word: '開ける', meaning: 'open', grammarType: 'verb' },
]

export const targetSets: ProblemSet[] = [
    // === SUBJECT BLANKS ===
    {
        ENText: 'The cat ate fish',
        JPText: '__は魚を食べた',
        answer: { word: '猫', meaning: 'cat', grammarType: 'subject' },
        incorrects: [{ word: '犬', meaning: 'dog', grammarType: 'subject' }, { word: '鳥', meaning: 'bird', grammarType: 'subject' }]
    },
    {
        ENText: 'Mom makes breakfast',
        JPText: '__が朝ごはんを作る',
        answer: { word: 'お母さん', meaning: 'mom', grammarType: 'subject' },
        incorrects: [{ word: '先生', meaning: 'teacher', grammarType: 'subject' }, { word: '友達', meaning: 'friend', grammarType: 'subject' }]
    },
    {
        ENText: 'The dog is running in the park',
        JPText: '__が公園で走っている',
        answer: { word: '犬', meaning: 'dog', grammarType: 'subject' },
        incorrects: [{ word: '猫', meaning: 'cat', grammarType: 'subject' }, { word: '子供', meaning: 'child', grammarType: 'subject' }]
    },
    {
        ENText: 'The teacher reads a book',
        JPText: '__が本を読む',
        answer: { word: '先生', meaning: 'teacher', grammarType: 'subject' },
        incorrects: [{ word: '学生', meaning: 'student', grammarType: 'subject' }, { word: 'お母さん', meaning: 'mom', grammarType: 'subject' }]
    },
    {
        ENText: 'My friend came to Japan',
        JPText: '__が日本に来た',
        answer: { word: '友達', meaning: 'friend', grammarType: 'subject' },
        incorrects: [{ word: '先生', meaning: 'teacher', grammarType: 'subject' }, { word: '学生', meaning: 'student', grammarType: 'subject' }]
    },
    {
        ENText: 'The bird is singing',
        JPText: '__が歌っている',
        answer: { word: '鳥', meaning: 'bird', grammarType: 'subject' },
        incorrects: [{ word: '猫', meaning: 'cat', grammarType: 'subject' }, { word: '犬', meaning: 'dog', grammarType: 'subject' }]
    },
    {
        ENText: 'The child is playing',
        JPText: '__が遊んでいる',
        answer: { word: '子供', meaning: 'child', grammarType: 'subject' },
        incorrects: [{ word: '学生', meaning: 'student', grammarType: 'subject' }, { word: '鳥', meaning: 'bird', grammarType: 'subject' }]
    },
    {
        ENText: 'The student studies Japanese',
        JPText: '__が日本語を勉強する',
        answer: { word: '学生', meaning: 'student', grammarType: 'subject' },
        incorrects: [{ word: '子供', meaning: 'child', grammarType: 'subject' }, { word: '友達', meaning: 'friend', grammarType: 'subject' }]
    },

    // === OBJECT BLANKS ===
    {
        ENText: 'Cats love fish',
        JPText: '猫は__が好き',
        answer: { word: '魚', meaning: 'fish', grammarType: 'object' },
        incorrects: [{ word: '水', meaning: 'water', grammarType: 'object' }, { word: 'ごはん', meaning: 'rice', grammarType: 'object' }]
    },
    {
        ENText: 'I drink water',
        JPText: '私は__を飲む',
        answer: { word: '水', meaning: 'water', grammarType: 'object' },
        incorrects: [{ word: '音楽', meaning: 'music', grammarType: 'object' }, { word: 'パン', meaning: 'bread', grammarType: 'object' }]
    },
    {
        ENText: 'She watches a movie',
        JPText: '彼女は__を見る',
        answer: { word: '映画', meaning: 'movie', grammarType: 'object' },
        incorrects: [{ word: '手紙', meaning: 'letter', grammarType: 'object' }, { word: 'ドア', meaning: 'door', grammarType: 'object' }]
    },
    {
        ENText: 'He buys bread',
        JPText: '彼は__を買う',
        answer: { word: 'パン', meaning: 'bread', grammarType: 'object' },
        incorrects: [{ word: '魚', meaning: 'fish', grammarType: 'object' }, { word: '水', meaning: 'water', grammarType: 'object' }]
    },
    {
        ENText: 'I write a letter',
        JPText: '私は__を書く',
        answer: { word: '手紙', meaning: 'letter', grammarType: 'object' },
        incorrects: [{ word: '映画', meaning: 'movie', grammarType: 'object' }, { word: '音楽', meaning: 'music', grammarType: 'object' }]
    },
    {
        ENText: 'The child eats rice',
        JPText: '子供は__を食べる',
        answer: { word: 'ごはん', meaning: 'rice', grammarType: 'object' },
        incorrects: [{ word: 'パン', meaning: 'bread', grammarType: 'object' }, { word: 'ドア', meaning: 'door', grammarType: 'object' }]
    },
    {
        ENText: 'I listen to music',
        JPText: '私は__を聞く',
        answer: { word: '音楽', meaning: 'music', grammarType: 'object' },
        incorrects: [{ word: '映画', meaning: 'movie', grammarType: 'object' }, { word: '手紙', meaning: 'letter', grammarType: 'object' }]
    },
    {
        ENText: 'She opens the door',
        JPText: '彼女は__を開ける',
        answer: { word: 'ドア', meaning: 'door', grammarType: 'object' },
        incorrects: [{ word: 'ごはん', meaning: 'rice', grammarType: 'object' }, { word: '魚', meaning: 'fish', grammarType: 'object' }]
    },

    // === VERB BLANKS ===
    {
        ENText: 'I eat sushi',
        JPText: '私はすしを__',
        answer: { word: '食べる', meaning: 'eat', grammarType: 'verb' },
        incorrects: [{ word: '飲む', meaning: 'drink', grammarType: 'verb' }, { word: '買う', meaning: 'buy', grammarType: 'verb' }]
    },
    {
        ENText: 'The student reads a book',
        JPText: '学生は本を__',
        answer: { word: '読む', meaning: 'read', grammarType: 'verb' },
        incorrects: [{ word: '書く', meaning: 'write', grammarType: 'verb' }, { word: '話す', meaning: 'speak', grammarType: 'verb' }]
    },
    {
        ENText: 'He speaks Japanese',
        JPText: '彼は日本語を__',
        answer: { word: '話す', meaning: 'speak', grammarType: 'verb' },
        incorrects: [{ word: '読む', meaning: 'read', grammarType: 'verb' }, { word: '歌う', meaning: 'sing', grammarType: 'verb' }]
    },
    {
        ENText: 'She drinks tea',
        JPText: '彼女はお茶を__',
        answer: { word: '飲む', meaning: 'drink', grammarType: 'verb' },
        incorrects: [{ word: '食べる', meaning: 'eat', grammarType: 'verb' }, { word: '開ける', meaning: 'open', grammarType: 'verb' }]
    },
    {
        ENText: 'I write kanji',
        JPText: '私は漢字を__',
        answer: { word: '書く', meaning: 'write', grammarType: 'verb' },
        incorrects: [{ word: '読む', meaning: 'read', grammarType: 'verb' }, { word: '話す', meaning: 'speak', grammarType: 'verb' }]
    },
    {
        ENText: 'The dog eats meat',
        JPText: '犬は肉を__',
        answer: { word: '食べる', meaning: 'eat', grammarType: 'verb' },
        incorrects: [{ word: '飲む', meaning: 'drink', grammarType: 'verb' }, { word: '歌う', meaning: 'sing', grammarType: 'verb' }]
    },
    {
        ENText: 'My friend sings a song',
        JPText: '友達は歌を__',
        answer: { word: '歌う', meaning: 'sing', grammarType: 'verb' },
        incorrects: [{ word: '話す', meaning: 'speak', grammarType: 'verb' }, { word: '買う', meaning: 'buy', grammarType: 'verb' }]
    },
    {
        ENText: 'I buy a present',
        JPText: '私はプレゼントを__',
        answer: { word: '買う', meaning: 'buy', grammarType: 'verb' },
        incorrects: [{ word: '書く', meaning: 'write', grammarType: 'verb' }, { word: '食べる', meaning: 'eat', grammarType: 'verb' }]
    },
]