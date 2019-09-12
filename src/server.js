const zxWordList = [
    "a",
    "about",
    "above",
    "across",
    "act",
    "active",
    "activity",
    "add",
    "afraid",
    "after",
    "again",
    "age",
    "ago",
    "agree",
    "air",
    "all",
    "alone",
    "along",
    "already",
    "always",
    "am",
    "amount",
    "an",
    "and",
    "angry",
    "another",
    "answer",
    "any",
    "anyone",
    "anything",
    "anytime",
    "appear",
    "apple",
    "are",
    "area",
    "arm",
    "army",
    "around",
    "arrive",
    "art",
    "as",
    "ask",
    "at",
    "attack",
    "aunt",
    "autumn",
    "away",
    "baby",
    "back",
    "bad",
    "bag",
    "ball",
    "bank",
    "base",
    "basket",
    "bath",
    "be",
    "bean",
    "bear",
    "beautiful",
    "bed",
    "bedroom",
    "beer",
    "behave",
    "before",
    "begin",
    "behind",
    "bell",
    "below",
    "besides",
    "best",
    "better",
    "between",
    "big",
    "bird",
    "birth",
    "birthday",
    "bit",
    "bite",
    "black",
    "bleed",
    "block",
    "blood",
    "blow",
    "blue",
    "board",
    "boat",
    "body",
    "boil",
    "bone",
    "book",
    "border",
    "born",
    "borrow",
    "both",
    "bottle",
    "bottom",
    "bowl",
    "box",
    "boy",
    "branch",
    "brave",
    "bread",
    "break",
    "breakfast",
    "breathe",
    "bridge",
    "bright",
    "bring",
    "brother",
    "brown",
    "brush",
    "build",
    "burn",
    "business",
    "bus",
    "busy",
    "but",
    "buy",
    "by",
    "cake",
    "call",
    "can",
    "candle",
    "cap",
    "car",
    "card",
    "care",
    "careful",
    "careless",
    "carry",
    "case",
    "cat",
    "catch",
    "central",
    "century",
    "certain",
    "chair",
    "chance",
    "change",
    "chase",
    "cheap",
    "cheese",
    "chicken",
    "child",
    "children",
    "chocolate",
    "choice",
    "choose",
    "circle",
    "city",
    "class",
    "clever",
    "clean",
    "clear",
    "climb",
    "clock",
    "cloth",
    "clothes",
    "cloud",
    "cloudy",
    "close",
    "coffee",
    "coat",
    "coin",
    "cold",
    "collect",
    "colour",
    "comb",
    "comfortable",
    "common",
    "compare",
    "come",
    "complete",
    "computer",
    "condition",
    "continue",
    "control",
    "cook",
    "cool",
    "copper",
    "corn",
    "corner",
    "correct",
    "cost",
    "contain",
    "count",
    "country",
    "course",
    "cover",
    "crash",
    "cross",
    "cry",
    "cup",
    "cupboard",
    "cut",
    "dance",
    "dangerous",
    "dark",
    "daughter",
    "day",
    "dead",
    "decide",
    "decrease",
    "deep",
    "deer",
    "depend",
    "desk",
    "destroy",
    "develop",
    "die",
    "different",
    "difficult",
    "dinner",
    "direction",
    "dirty",
    "discover",
    "dish",
    "do",
    "dog",
    "door",
    "double",
    "down",
    "draw",
    "dream",
    "dress",
    "drink",
    "drive",
    "drop",
    "dry",
    "duck",
    "dust",
    "duty",
    "each",
    "ear",
    "early",
    "earn",
    "earth",
    "east",
    "easy",
    "eat",
    "education",
    "effect",
    "egg",
    "eight",
    "either",
    "electric",
    "elephant",
    "else",
    "empty",
    "end",
    "enemy",
    "enjoy",
    "enough",
    "enter",
    "equal",
    "entrance",
    "escape",
    "even",
    "evening",
    "event",
    "ever",
    "every",
    "everyone",
    "exact",
    "everybody",
    "examination",
    "example",
    "except",
    "excited",
    "exercise",
    "expect",
    "expensive",
    "explain",
    "extremely",
    "eye",
    "face",
    "fact",
    "fail",
    "fall",
    "false",
    "family",
    "famous",
    "far",
    "farm",
    "father",
    "fast",
    "fat",
    "fault",
    "fear",
    "feed",
    "feel",
    "female",
    "fever",
    "few",
    "fight",
    "fill",
    "film",
    "find",
    "fine",
    "finger",
    "finish",
    "fire",
    "first",
    "fish",
    "fit",
    "five",
    "fix",
    "flag",
    "flat",
    "float",
    "floor",
    "flour",
    "flower",
    "fly",
    "fold",
    "food",
    "fool",
    "foot",
    "football",
    "for",
    "force",
    "foreign",
    "forest",
    "forget",
    "forgive",
    "fork",
    "form",
    "fox",
    "four",
    "free",
    "freedom",
    "freeze",
    "fresh",
    "friend",
    "friendly",
    "from",
    "front",
    "fruit",
    "full",
    "fun",
    "funny",
    "furniture",
    "further",
    "future",
    "game",
    "garden",
    "gate",
    "general",
    "gentleman",
    "get",
    "gift",
    "give",
    "glad",
    "glass",
    "go",
    "goat",
    "god",
    "gold",
    "good",
    "goodbye",
    "grandfather",
    "grandmother",
    "grass",
    "grave",
    "great",
    "green",
    "gray",
    "ground",
    "group",
    "grow",
    "gun",
    "hair",
    "half",
    "hall",
    "hammer",
    "hand",
    "happen",
    "happy",
    "hard",
    "hat",
    "hate",
    "have",
    "he",
    "head",
    "healthy",
    "hear",
    "heavy",
    "heart",
    "heaven",
    "height",
    "hello",
    "help",
    "hen",
    "her",
    "here",
    "hers",
    "hide",
    "high",
    "hill",
    "him",
    "his",
    "hit",
    "hobby",
    "hold",
    "hole",
    "holiday",
    "home",
    "hope",
    "horse",
    "hospital",
    "hot",
    "hotel",
    "house",
    "how",
    "hundred",
    "hungry",
    "hour",
    "hurry",
    "husband",
    "hurt",
    "I",
    "ice",
    "idea",
    "if",
    "important",
    "in",
    "increase",
    "inside",
    "into",
    "introduce",
    "invent",
    "iron",
    "invite",
    "is",
    "island",
    "it",
    "its",
    "jelly",
    "job",
    "join",
    "juice",
    "jump",
    "just",
    "keep",
    "key",
    "kill",
    "kind",
    "king",
    "kitchen",
    "knee",
    "knife",
    "knock",
    "know",
    "ladder",
    "lady",
    "lamp",
    "land",
    "large",
    "last",
    "late",
    "lately",
    "laugh",
    "lazy",
    "lead",
    "leaf",
    "learn",
    "leave",
    "leg",
    "left",
    "lend",
    "length",
    "less",
    "lesson",
    "let",
    "letter",
    "library",
    "lie",
    "life",
    "light",
    "like",
    "lion",
    "lip",
    "list",
    "listen",
    "little",
    "live",
    "lock",
    "lonely",
    "long",
    "look",
    "lose",
    "lot",
    "love",
    "low",
    "lower",
    "luck",
    "machine",
    "main",
    "make",
    "male",
    "man",
    "many",
    "map",
    "mark",
    "market",
    "marry",
    "matter",
    "may",
    "me",
    "meal",
    "mean",
    "measure",
    "meat",
    "medicine",
    "meet",
    "member",
    "mention",
    "method",
    "middle",
    "milk",
    "million",
    "mind",
    "minute",
    "miss",
    "mistake",
    "mix",
    "model",
    "modern",
    "moment",
    "money",
    "monkey",
    "month",
    "moon",
    "more",
    "morning",
    "most",
    "mother",
    "mountain",
    "mouth",
    "move",
    "much",
    "music",
    "must",
    "my",
    "name",
    "narrow",
    "nation",
    "nature",
    "near",
    "nearly",
    "neck",
    "need",
    "needle",
    "neighbour",
    "neither",
    "net",
    "never",
    "new",
    "news",
    "newspaper",
    "next",
    "nice",
    "night",
    "nine",
    "no",
    "noble",
    "noise",
    "none",
    "nor",
    "north",
    "nose",
    "not",
    "nothing",
    "notice",
    "now",
    "number",
    "obey",
    "object",
    "ocean",
    "of",
    "off",
    "offer",
    "office",
    "often",
    "oil",
    "old",
    "on",
    "one",
    "only",
    "open",
    "opposite",
    "or",
    "orange",
    "order",
    "other",
    "our",
    "out",
    "outside",
    "over",
    "own",
    "page",
    "pain",
    "paint",
    "pair",
    "pan",
    "paper",
    "parent",
    "park",
    "part",
    "partner",
    "party",
    "pass",
    "past",
    "path",
    "pay",
    "peace",
    "pen",
    "pencil",
    "people",
    "pepper",
    "per",
    "perfect",
    "period",
    "person",
    "petrol",
    "photograph",
    "piano",
    "pick",
    "picture",
    "piece",
    "pig",
    "pin",
    "pink",
    "place",
    "plane",
    "plant",
    "plastic",
    "plate",
    "play",
    "please",
    "pleased",
    "plenty",
    "pocket",
    "point",
    "poison",
    "police",
    "polite",
    "pool",
    "poor",
    "popular",
    "position",
    "possible",
    "potato",
    "pour",
    "power",
    "present",
    "press",
    "pretty",
    "prevent",
    "price",
    "prince",
    "prison",
    "private",
    "prize",
    "probably",
    "problem",
    "produce",
    "promise",
    "proper",
    "protect",
    "provide",
    "public",
    "pull",
    "punish",
    "pupil",
    "push",
    "put",
    "queen",
    "question",
    "quick",
    "quiet",
    "quite",
    "radio",
    "rain",
    "rainy",
    "raise",
    "reach",
    "read",
    "ready",
    "real",
    "really",
    "receive",
    "record",
    "red",
    "remember",
    "remind",
    "remove",
    "rent",
    "repair",
    "repeat",
    "reply",
    "report",
    "rest",
    "restaurant",
    "result",
    "return",
    "rice",
    "rich",
    "ride",
    "right",
    "ring",
    "rise",
    "road",
    "rob",
    "rock",
    "room",
    "round",
    "rubber",
    "rude",
    "rule",
    "ruler",
    "run",
    "rush",
    "sad",
    "safe",
    "sail",
    "salt",
    "same",
    "sand",
    "save",
    "say",
    "school",
    "science",
    "scissors",
    "search",
    "seat",
    "second",
    "see",
    "seem",
    "sell",
    "send",
    "sentence",
    "serve",
    "seven",
    "several",
    "sex",
    "shade",
    "shadow",
    "shake",
    "shape",
    "share",
    "sharp",
    "she",
    "sheep",
    "sheet",
    "shelf",
    "shine",
    "ship",
    "shirt",
    "shoe",
    "shoot",
    "shop",
    "short",
    "should",
    "shoulder",
    "shout",
    "show",
    "sick",
    "side",
    "signal",
    "silence",
    "silly",
    "silver",
    "similar",
    "simple",
    "single",
    "since",
    "sing",
    "sink",
    "sister",
    "sit",
    "six",
    "size",
    "skill",
    "skin",
    "skirt",
    "sky",
    "sleep",
    "slip",
    "slow",
    "small",
    "smell",
    "smile",
    "smoke",
    "snow",
    "so",
    "soap",
    "sock",
    "soft",
    "some",
    "someone",
    "something",
    "sometimes",
    "son",
    "soon",
    "sorry",
    "sound",
    "soup",
    "south",
    "space",
    "speak",
    "special",
    "speed",
    "spell",
    "spend",
    "spoon",
    "sport",
    "spread",
    "spring",
    "square",
    "stamp",
    "stand",
    "star",
    "start",
    "station",
    "stay",
    "steal",
    "steam",
    "step",
    "still",
    "stomach",
    "stone",
    "stop",
    "store",
    "storm",
    "story",
    "strange",
    "street",
    "strong",
    "structure",
    "student",
    "study",
    "stupid",
    "subject",
    "substance",
    "successful",
    "such",
    "sudden",
    "sugar",
    "suitable",
    "summer",
    "sun",
    "sunny",
    "support",
    "sure",
    "surprise",
    "sweet",
    "swim",
    "sword",
    "table",
    "take",
    "talk",
    "tall",
    "taste",
    "taxi",
    "tea",
    "teach",
    "team",
    "tear",
    "telephone",
    "television",
    "tell",
    "ten",
    "tennis",
    "terrible",
    "test",
    "than",
    "that",
    "the",
    "their",
    "then",
    "there",
    "therefore",
    "these",
    "thick",
    "thin",
    "thing",
    "think",
    "third",
    "this",
    "though",
    "threat",
    "three",
    "tidy",
    "tie",
    "title",
    "to",
    "today",
    "toe",
    "together",
    "tomorrow",
    "tonight",
    "too",
    "tool",
    "tooth",
    "top",
    "total",
    "touch",
    "town",
    "train",
    "tram",
    "travel",
    "tree",
    "trouble",
    "true",
    "trust",
    "twice",
    "try",
    "turn",
    "type",
    "ugly",
    "uncle",
    "under",
    "understand",
    "unit",
    "until",
    "up",
    "use",
    "useful",
    "usual",
    "usually",
    "vegetable",
    "very",
    "village",
    "voice",
    "visit",
    "wait",
    "wake",
    "walk",
    "want",
    "warm",
    "was",
    "wash",
    "waste",
    "watch",
    "water",
    "way",
    "we",
    "weak",
    "wear",
    "weather",
    "wedding",
    "week",
    "weight",
    "welcome",
    "were",
    "well",
    "west",
    "wet",
    "what",
    "wheel",
    "when",
    "where",
    "which",
    "while",
    "white",
    "who",
    "why",
    "wide",
    "wife",
    "wild",
    "will",
    "win",
    "wind",
    "window",
    "wine",
    "winter",
    "wire",
    "wise",
    "wish",
    "with",
    "without",
    "woman",
    "wonder",
    "word",
    "work",
    "world",
    "worry",
    "yard",
    "yell",
    "yesterday",
    "yet",
    "you",
    "young",
    "your",
    "zero",
    "zoo",
];

class ZxGame {
    constructor() {
        this.zxData = {
            zxId: zxUid(),
            zxName: null,
            zxPlayers: [],
            zxTexts: [],
            zxCurrentDrawData: null,
            zxCurrentPlayer: null,
            zxState: 'zxIdle',
        };

        this.zxCurrentWord = null;
        this.zxCurrentPlayerIndex = 10000;
        this.zxPaths = null;
        this.zxUpdateTimer = setInterval(() => {
            this.zxUpdateLoop().catch((zxError) => {
                console.error('Error in update loop', zxError);
            });
        }, 100);

        this.zxCurrentPath = null;
        this.zxCurrentPathPoint = null;
    }

    zxBroadcast(zxHandler, zxData, zxExcludePlayer) {
        for (const zxPlayer of this.zxData.zxPlayers) {
            if (zxPlayer === zxExcludePlayer) {
                continue;
            }
            zxEmit(zxPlayer.zxSocket, zxHandler, zxData);
        }
    }

    async zxUpdateLoop() {
        switch (this.zxData.zxState) {
            case 'zxIdle':
                // Get next player
                this.zxCurrentPlayerIndex++;
                if (this.zxCurrentPlayerIndex >= this.zxData.zxPlayers.length) {
                    this.zxCurrentPlayerIndex = 0;
                }

                const zxSavedWords = await zxParseSavedWords();
                // console.log(zxSavedWords);
                if (this.zxData.zxPlayers.length === 1 && zxSavedWords.length > 0) {
                    // Only 1 player so use saved words
                    this.zxData.zxCurrentPlayer = null;
                    const zxSavedWord = zxSavedWords[Math.floor(Math.random() * zxSavedWords.length)];
                    this.zxCurrentWord = zxSavedWord.zxWord;
                    this.zxPaths = zxSavedWord.zxPaths;
                    this.zxData.zxState = 'zxReady';
                } else if (this.zxData.zxPlayers.length !== 0) {
                    this.zxData.zxCurrentPlayer = this.zxData.zxPlayers[this.zxCurrentPlayerIndex];
                    // Get word for player to draw
                    this.zxCurrentWord = zxWordList[Math.floor(Math.random() * zxWordList.length)];
                    // @todo make sure word hasn't been used recently

                    zxEmit(this.zxData.zxCurrentPlayer.zxSocket, 'zxDrawerStart', {
                        zxGame: this,
                        zxWord: this.zxCurrentWord,
                    });

                    this.zxBroadcast('zxDrawStart', {
                        zxGame: this,
                        zxPlayer: this.zxData.zxCurrentPlayer,
                    }, this.zxData.zxCurrentPlayer);

                    this.zxData.zxRound = 1;
                    this.zxData.zxState = 'zxWaitingOnDrawer';
                    this.zxCountDown = 5 + this.zxCurrentWord.length;
                }
                // console.log('Current word', this.zxCurrentWord);
                break;

            case 'zxWaitingOnDrawer':
                this.zxBroadcast('zxCountDown', {
                    zxCountDown: this.zxCountDown,
                });
                this.zxCountDown -= 0.1;
                if (this.zxCountDown <= 0) {
                    this.zxData.zxCurrentPlayer.zxData.zxScore -= 50;
                    if (this.zxData.zxCurrentPlayer.zxData.zxScore < 0) {
                        this.zxData.zxCurrentPlayer.zxData.zxScore = 0;
                    }
                    this.zxBroadcast('zxUpdatePlayers', {
                        zxGame: this,
                    });
                    this.zxData.zxTexts.push(`${this.zxData.zxCurrentPlayer.zxData.zxName} took too long to draw!`);
                    this.zxData.zxState = 'zxIdle';
                    this.zxBroadcast('zxRecieveText', {
                        zxLines: this.zxData.zxTexts.slice(-5).reverse(),
                    });
                }
                break;

            case 'zxReady':
                this.zxCurrentPath = this.zxPaths.length - 1;
                this.zxCurrentPathPoint = this.zxPaths[this.zxCurrentPath].length - 1;
                this.zxData.zxState = 'zxDrawing';
                let zxTotalPathLength = 0;
                for (const zxPath of this.zxPaths) {
                    zxTotalPathLength += zxPath.length;
                }
                this.zxPointsPerStep = Math.ceil(zxTotalPathLength / 100);

                this.zxBroadcast('zxDrawing', {
                    zxPathBounds: zxGetPathBounds(this.zxPaths),
                }, this.zxData.zxCurrentPlayer);
                if (this.zxData.zxCurrentPlayer) {
                    zxEmit(this.zxData.zxCurrentPlayer.zxSocket, 'zxWaitingForRoundEnd', {
                        zxPathBounds: zxGetPathBounds(this.zxPaths),
                    });
                }
                break;

            case 'zxDrawing':
                for (let i = 0; i < this.zxPointsPerStep; i++) {
                    this.zxCurrentPathPoint--;
                    if (this.zxCurrentPathPoint < 0) {
                        this.zxCurrentPath--;
                        if (this.zxCurrentPath < 0) {
                            this.zxData.zxState = 'zxWaitingForFinalGuess';
                            this.zxCountDown = 5;
                            break;
                        }
                        this.zxCurrentPathPoint = this.zxPaths[this.zxCurrentPath].length - 1;
                    }
                    const zxNextPoint = this.zxPaths[this.zxCurrentPath][this.zxCurrentPathPoint];
                    this.zxBroadcast('zxNextPoint', {
                        zxCurrentPath: this.zxPaths.length - this.zxCurrentPath,
                        zxNextPoint: zxNextPoint,
                    });
                }
                break;

            case 'zxWaitingForFinalGuess':
                this.zxBroadcast('zxCountDown', {
                    zxCountDown: this.zxCountDown,
                });
                this.zxCountDown -= 0.1;
                if (this.zxCountDown <= 0) {
                    if (this.zxData.zxCurrentPlayer) {
                        this.zxData.zxCurrentPlayer.zxData.zxScore -= 75;
                        if (this.zxData.zxCurrentPlayer.zxData.zxScore < 0) {
                            this.zxData.zxCurrentPlayer.zxData.zxScore = 0;
                        }
                        this.zxBroadcast('zxUpdatePlayers', {
                            zxGame: this,
                        });
                    }
                    this.zxData.zxTexts.push(`No one guessed the word in time. The word was ${this.zxCurrentWord}!`);
                    this.zxData.zxState = 'zxIdle';
                    this.zxBroadcast('zxRecieveText', {
                        zxLines: this.zxData.zxTexts.slice(-5).reverse(),
                    });
                }
                break;
        }
    }
}

class ZxPlayer {
    constructor(zxSocket) {
        zxLog('Creating player', zxSocket.id);
        this.zxData = {
            zxId: zxUid(),
            zxName: null,
            zxScore: 0,
            // zxDrawnWords: [],
        };
        this.zxSocket = zxSocket;
        this.zxGame = null;
    }
}

const zxSockets = {};
const zxPlayers = [];
const zxGames = [];

const zxHandlers = {
    zxConnect(zxPlayer, zxData) {
        // @todo validate name is avalible
        let zxName = zxData.zxName || 'Player';
        let zxCount = 1;
        for (const zxPlayerNameCheck of zxPlayer.zxGame.zxData.zxPlayers) {
            if (zxPlayerNameCheck.zxData.zxName == zxName || zxPlayerNameCheck.zxData.zxName == zxName + ' ' + zxCount) {
                zxCount++;
            }
        }
        if (zxCount > 1) {
            zxName = zxName + ' ' + zxCount;
        }
        zxPlayer.zxData.zxName = zxName;
        zxEmit(zxPlayer.zxSocket, 'zxGameConnected', {});
        zxPlayer.zxGame.zxBroadcast('zxUpdatePlayers', {
            zxGame: zxPlayer.zxGame,
        });
        return {
            zxConnected: true,
        };
    },

    zxCreateGame(zxPlayer, zxData) {
        const zxGame = new ZxGame();
        zxGame.zxData.zxPlayers.push(zxPlayer);
        zxGames.push(zxGame);
        zxPlayer.zxGame = zxGame;
        return zxGame;
    },

    zxJoinGame(zxPlayer, zxData) {
        const zxGame = zxGames.find(zxGame => zxGame.zxData.zxId === zxData.zxGameId);
        if (!zxGame) {
            return;
        }
        zxGame.zxData.zxPlayers.push(zxPlayer);
        zxGame.zxBroadcast('zxUpdatePlayers', {
            zxGame: zxGame,
        });
        zxPlayer.zxGame = zxGame;
        return zxGame;
    },

    zxListGames(zxPlayer, zxData) {
        return zxGames;
    },

    zxSubmitText(zxPlayer, zxData) {
        const zxText = zxData.zxText.trim().toLowerCase();
        if (zxText) {
            zxPlayer.zxGame.zxData.zxTexts.push(`${zxPlayer.zxData.zxName}: ${zxText}`);
        }
        if (zxText == zxPlayer.zxGame.zxCurrentWord) {
            zxPlayer.zxGame.zxData.zxTexts.push(`${zxPlayer.zxData.zxName} guessed correctly, the word is ${zxPlayer.zxGame.zxCurrentWord}!`);
            zxPlayer.zxData.zxScore += 100;
            zxPlayer.zxGame.zxData.zxState = 'zxIdle';

        } else {
            zxPlayer.zxData.zxScore -= 5;
            if (zxPlayer.zxData.zxScore < 0) {
                zxPlayer.zxData.zxScore = 0;
            }
        }
        zxPlayer.zxGame.zxBroadcast('zxUpdatePlayers', {
            zxGame: zxPlayer.zxGame,
        });
        zxPlayer.zxGame.zxBroadcast('zxRecieveText', {
            zxLines: zxPlayer.zxGame.zxData.zxTexts.slice(-5).reverse(),
        });
    },

    zxFetchWord(zxPlayer, zxData) {
        return zxWordList[Math.floor(Math.random() * zxWordList.length)];
    },

    async zxDoneDrawing(zxPlayer, zxPaths) {
        if (zxPlayer.zxGame.zxData.zxState === 'zxWaitingOnDrawer' && zxPlayer === zxPlayer.zxGame.zxData.zxCurrentPlayer) {
            if (!zxPaths.length) {
                zxPlayer.zxGame.zxData.zxState = 'zxIdle';
                return;
            }
            zxPlayer.zxGame.zxPaths = zxPaths;
            zxPlayer.zxGame.zxData.zxState = 'zxReady';

            // Store the word for single player
            const zxSavedWords = await zxParseSavedWords();
            zxSavedWords.unshift({
                zxWord: zxPlayer.zxGame.zxCurrentWord,
                zxPaths,
            });

            let zxSavedWordsString = '';
            for (const zxSavedWord of zxSavedWords) {
                const zxBinaryPaths = zxPathsToBinary(zxSavedWord.zxPaths);
                const zxNextString = zxSavedWord.zxWord + ':' + zxBinaryPaths.length + ':' + zxBinaryPaths + ':';
                if (zxSavedWordsString.length + zxNextString.length < 13312 / 2) {
                    zxSavedWordsString += zxNextString;
                }
            }
            await storage.set('savedWords', zxSavedWordsString, false);
            // console.log('Save words', zxSavedWords);
            // await storage.set('savedWords', zxSavedWords, true);
        }
    },
};

const zxGetPathBounds = (zxPaths) => {
    let zxMinX = 10000;
    let zxMinY = 10000;
    let zxMaxX = 0;
    let zxMaxY = 0;
    for (const zxPath of zxPaths) {
        for (const zxPoint of zxPath) {
            if (zxPoint[0] < zxMinX) {
                zxMinX = zxPoint[0];
            }
            if (zxPoint[1] < zxMinY) {
                zxMinY = zxPoint[1];
            }
            if (zxPoint[0] > zxMaxX) {
                zxMaxX = zxPoint[0];
            }
            if (zxPoint[1] > zxMaxY) {
                zxMaxY = zxPoint[1];
            }
        }
    }
    return `${zxMinX - 5} ${zxMinY - 5} ${zxMaxX - zxMinX + 10} ${zxMaxY - zxMinY + 10}`;
};

const zxPathsToBinary = (zxPaths) => {
    let zxResult = '';
    for (const zxPath of zxPaths) {
        const zxString = String.fromCharCode.apply(null, Uint16Array.from(zxPath.flat()));
        zxResult += zxString.length + ':' + zxString + ':';
    }
    return zxResult;
}

const zxBinaryToPaths = (zxBinaryString) => {
    const zxPaths = [];
    while (zxBinaryString.length > 0) {
        const zxLengthPosition = zxBinaryString.indexOf(':');
        const zxLength = parseInt(zxBinaryString.substr(0, zxLengthPosition));
        zxBinaryString = zxBinaryString.substr(zxLengthPosition + 1);
        const zxPathString = zxBinaryString.substr(0, zxLength);
        zxBinaryString = zxBinaryString.substr(zxLength + 1);

        const zxBuffer = new ArrayBuffer(zxPathString.length * 2);
        const zxArray = new Uint16Array(zxBuffer);
        for (let i = 0, strLen = zxPathString.length; i < strLen; i++) {
            zxArray[i] = zxPathString.charCodeAt(i);
        }
        const zxPath = [];
        for (let i = 0; i < zxArray.length; i += 2) {
            zxPath.push([zxArray[i], zxArray[i + 1]]);
        }
        zxPaths.push(zxPath);
    }
    return zxPaths;
}

const zxParseSavedWords = async () => {
    // return await storage.get('savedWords', [], true);
    let zxSavedWords = await storage.get('savedWords', '', false);
    const zxResult = [];
    while (zxSavedWords.length > 0) {
        const zxWordPosition = zxSavedWords.indexOf(':');
        const zxWord = zxSavedWords.substr(0, zxWordPosition);
        zxSavedWords = zxSavedWords.substr(zxWordPosition + 1);
        const zxLengthPosition = zxSavedWords.indexOf(':');
        const zxLength = parseInt(zxSavedWords.substr(0, zxLengthPosition));
        zxSavedWords = zxSavedWords.substr(zxLengthPosition + 1);
        const zxPathString = zxSavedWords.substr(0, zxLength);
        zxSavedWords = zxSavedWords.substr(zxLength + 1);
        zxResult.push({
            zxWord,
            zxPaths: zxBinaryToPaths(zxPathString),
        });
    }
    return zxResult;
}

const zxCurrentGame = new ZxGame();
zxGames.push(zxCurrentGame);
module.exports = {
    io: (zxSocket) => {
        // @todo make sure socket references is deleted on connection lost
        zxSockets[zxSocket.id] = zxSocket;
        const zxPlayer = new ZxPlayer(zxSocket);
        zxPlayers.push(zxPlayer);

        zxCurrentGame.zxData.zxPlayers.push(zxPlayer);
        zxPlayer.zxGame = zxCurrentGame;

        zxSocket.on('disconnect', () => {
            zxCurrentGame.zxData.zxPlayers = zxCurrentGame.zxData.zxPlayers.filter((zxListPlayer) => {
                return zxPlayer != zxListPlayer;
            });
            zxCurrentGame.zxBroadcast('zxUpdatePlayers', {
                zxGame: zxCurrentGame,
            });
            delete zxSockets[zxSocket.id];
        });

        zxSocket.on('zxMessage', zxHandleMessage(zxSocket, zxPlayer));
    },

    stat: (req, res) => {
        storage.get('games', 0).then(games => {
            res.send(`<h1>Games played: ${games}</h1>`);
        });
    }
};
