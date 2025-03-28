// Dictionary management
const DICTIONARY_URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
const CACHE_KEY = 'word_puzzle_dictionary';

export async function loadDictionary() {
    // Try to load from cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            console.log('Loaded dictionary from cache:', parsed.length, 'words');
            return new Set(parsed);
        } catch (e) {
            console.error('Failed to parse cached dictionary');
        }
    }

    // If no cache or parse failed, fetch from source
    try {
        const response = await fetch(DICTIONARY_URL);
        const text = await response.text();
        const words = text.split('\n')
            .map(word => word.trim().toLowerCase())
            .filter(word => {
                // Only include words that are 3-5 letters long and contain only letters
                const len = word.length;
                return len >= 3 && len <= 5 && /^[a-z]+$/.test(word);
            });

        // Cache the dictionary
        localStorage.setItem(CACHE_KEY, JSON.stringify(words));
        console.log('Loaded dictionary from source:', words.length, 'words');
        return new Set(words);
    } catch (error) {
        console.error('Failed to fetch dictionary:', error);
        // Return a basic set of words as fallback
        return new Set([
            // Basic 3-letter words
            'cat', 'dog', 'rat', 'mat', 'sat', 'eat', 'hat', 'bat', 'pat',
            'tap', 'map', 'pad', 'sad', 'car', 'bar', 'tar', 'far', 'war',
            'art', 'ant', 'pen', 'ten', 'den', 'hen', 'men', 'zen',
            // Basic 4-letter words
            'word', 'rock', 'back', 'deck', 'farm', 'hand', 'jump', 'king',
            'lamp', 'mind', 'note', 'park', 'quit', 'rain', 'stop', 'time',
            // Basic 5-letter words
            'words', 'world', 'beach', 'clock', 'dream', 'earth', 'flame',
            'green', 'heart', 'light', 'music', 'ocean', 'peace', 'queen'
        ]);
    }
}

// Dictionary of valid words for the game
window.DICTIONARY = new Set([
    // Common 3-letter words
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had', 'her',
    'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new',
    'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say',
    'she', 'too', 'use', 'dad', 'mom', 'cat', 'dog', 'run', 'eat', 'fly', 'big', 'box',
    'car', 'bus', 'map', 'red', 'end', 'top', 'sun', 'fun', 'ran', 'rod', 'air', 'arm', 'art', 'bad',
    'bed', 'bee', 'bit', 'buy', 'can', 'cap', 'cry', 'cup', 'cut', 'dig', 'dry', 'ear', 'fan',
    'fog', 'get', 'god', 'gun', 'gut', 'gym', 'had', 'ham', 'hat', 'hay', 'hex', 'hey', 'pan',
    'hip', 'hit', 'hop', 'hot', 'how', 'hub', 'hue', 'hug', 'hut', 'ice', 'ink', 'inn',
    'jam', 'jar', 'jaw', 'jay', 'jet', 'job', 'jog', 'joy', 'key', 'kid', 'kit', 'lab',
    'lag', 'lap', 'law', 'lay', 'leg', 'let', 'lid', 'lie', 'lip', 'log', 'low', 'mad',
    'man', 'map', 'mat', 'max', 'may', 'men', 'mix', 'mob', 'mud', 'mug', 'nap', 'net',
    'new', 'nod', 'not', 'now', 'nut', 'oak', 'odd', 'off', 'oil', 'old', 'one', 'our',
    'out', 'owe', 'owl', 'own', 'pad', 'pan', 'pat', 'pay', 'pea', 'pen', 'pet', 'pie',
    'pig', 'pin', 'pit', 'pop', 'pot', 'pry', 'pub', 'pup', 'put', 'rag', 'ram', 'rap',
    'rat', 'raw', 'ray', 'red', 'rib', 'rid', 'rim', 'rip', 'rob', 'rod', 'rot', 'row',
    'rub', 'rug', 'rum', 'run', 'sad', 'sag', 'saw', 'say', 'sea', 'see', 'set', 'sew',
    'shy', 'sin', 'sip', 'sir', 'sit', 'six', 'ski', 'sky', 'sly', 'spy', 'sum', 'sun',
    'tab', 'tag', 'tan', 'tap', 'tar', 'tax', 'tea', 'ten', 'the', 'tie', 'tin', 'tip',
    'toe', 'ton', 'too', 'top', 'toy', 'try', 'tub', 'two', 'use', 'van', 'vat', 'vet',
    'vow', 'wag', 'war', 'was', 'wax', 'way', 'web', 'wed', 'wet', 'who', 'why', 'win',
    'wit', 'won', 'wow', 'yes', 'yet', 'you', 'zip', 'zoo',
    // Common 4-letter words
    'spot', 'blew', 'blow', 'blue', 'love', 'life', 'live', 'time', 'home', 'room', 'work', 'word', 'book', 'door',
    'game', 'fish', 'bird', 'tree', 'seed', 'foot', 'hand', 'head', 'hear', 'help', 'salt',
    'hold', 'hope', 'hurt', 'jump', 'keep', 'kill', 'kind', 'know', 'land', 'last', 'able',
    'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank',
    'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'best', 'bike', 'bird',
    'bite', 'blue', 'boat', 'body', 'bomb', 'bond', 'bone', 'book', 'boom', 'born', 'boss',
    'both', 'bowl', 'bulk', 'burn', 'bush', 'busy', 'cake', 'call', 'calm', 'came', 'camp',
    'card', 'care', 'case', 'cash', 'cast', 'cave', 'cell', 'chat', 'chip', 'city', 'club',
    'clue', 'coal', 'coat', 'code', 'cold', 'come', 'cook', 'cool', 'cope', 'copy', 'core',
    'cost', 'crew', 'crop', 'dark', 'data', 'date', 'dawn', 'days', 'dead', 'deal', 'dean',
    'dear', 'debt', 'deep', 'deny', 'desk', 'dial', 'diet', 'disc', 'disk', 'does', 'done',
    'door', 'dose', 'down', 'draw', 'drew', 'drop', 'drug', 'drum', 'dual', 'duke', 'dust',
    'duty', 'each', 'earn', 'ease', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'evil',
    'exit', 'face', 'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed',
    'feel', 'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm',
    'fish', 'five', 'flat', 'flow', 'food', 'foot', 'ford', 'form', 'fort', 'four', 'free',
    'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear', 'gene', 'gift',
    'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'golf', 'gone', 'good', 'gray', 'grew',
    'grey', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate',
    'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero', 'high', 'hill',
    'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hour', 'huge', 'hung', 'hunt',
    'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'jack', 'jane', 'jean', 'john', 'join',
    'jump', 'jury', 'just', 'keen', 'keep', 'kent', 'kept', 'kick', 'kill', 'kind', 'king',
    'knee', 'knew', 'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late',
    'lead', 'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load',
    'loan', 'lock', 'logo', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck',
    'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mass', 'matt', 'meal', 'mean',
    'meat', 'meet', 'menu', 'mere', 'mike', 'mile', 'milk', 'mill', 'mind', 'mine', 'miss',
    'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'navy', 'near',
    'neck', 'need', 'news', 'next', 'nice', 'nick', 'nine', 'none', 'nose', 'note', 'okay',
    'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack', 'page', 'paid', 'pain',
    'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pink', 'pipe',
    'plan', 'play', 'plot', 'plug', 'plus', 'poll', 'pool', 'poor', 'port', 'post', 'pull',
    'pure', 'push', 'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear',
    'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock',
    'role', 'roll', 'roof', 'room', 'root', 'rose', 'rule', 'rush', 'ruth', 'safe', 'said',
    'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'seen',
    'self', 'sell', 'send', 'sent', 'sept', 'ship', 'shop', 'shot', 'show', 'shut', 'sick',
    'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold',
    'sole', 'some', 'song', 'soon', 'sort', 'soul', 'spot', 'star', 'stay', 'step', 'stop',
    'take', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tech', 'tell', 'tend',
    'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'this', 'time', 'to',
    'toe', 'told', 'tone', 'took', 'tool', 'top', 'tour', 'town', 'tree', 'try', 'turn', 'type',
    'unit', 'up', 'upon', 'us', 'use', 'very', 'view', 'was', 'way', 'we', 'well', 'were',
    'what', 'when', 'where', 'which', 'while', 'who', 'why', 'will', 'with', 'would', 'you',
    'your', 'yours', 'zero',
    // Common 5-letter words
    'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
    'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alike', 'alive', 'allow', 'alone',
    'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple', 'apply', 'arena',
    'argue', 'arise', 'array', 'aside', 'audio', 'audit', 'avoid', 'award', 'aware', 'badly',
    'baker', 'bases', 'basic', 'basis', 'beach', 'began', 'begin', 'begun', 'being', 'below',
    'bench', 'birth', 'black', 'blame', 'blind', 'block', 'blood', 'board', 'boost', 'brain',
    'brand', 'bread', 'break', 'breed', 'brief', 'bring', 'broad', 'broke', 'brown', 'build',
    'buyer', 'cable', 'carry', 'catch', 'cause', 'chain', 'chair', 'chart', 'cheap', 'check',
    'chest', 'chief', 'civil', 'claim', 'class', 'clean', 'clear', 'click', 'clock', 'close',
    'coach', 'coast', 'count', 'court', 'cover', 'craft', 'crash', 'cream', 'crime', 'cross',
    'crowd', 'crown', 'curve', 'cycle', 'daily', 'dance', 'death', 'depth', 'doubt', 'draft',
    'drama', 'dream', 'dress', 'drill', 'drink', 'drive', 'early', 'earth', 'eight', 'elite',
    'empty', 'enemy', 'enjoy', 'enter', 'entry', 'equal', 'error', 'event', 'exact', 'exist',
    'extra', 'faith', 'false', 'fault', 'fiber', 'field', 'fifth', 'fight', 'final', 'focus',
    'force', 'frame', 'frank', 'front', 'fruit', 'fully', 'funny', 'giant', 'glass', 'grade',
    'grand', 'grant', 'grass', 'great', 'green', 'gross', 'group', 'guard', 'guess', 'guest',
    'guide', 'happy', 'heart', 'heavy', 'hence', 'horse', 'hotel', 'house', 'human', 'ideal',
    'image', 'index', 'inner', 'input', 'issue', 'joint', 'judge', 'knife', 'large', 'laugh',
    'layer', 'learn', 'lease', 'least', 'leave', 'legal', 'level', 'light', 'limit', 'local',
    'logic', 'loose', 'lower', 'lucky', 'lunch', 'magic', 'major', 'march', 'match', 'metal',
    'minor', 'model', 'money', 'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'movie',
    'music', 'noise', 'north', 'novel', 'nurse', 'occur', 'ocean', 'offer', 'order', 'other',
    'outer', 'owner', 'panel', 'paper', 'party', 'peace', 'phase', 'phone', 'photo', 'piece',
    'pitch', 'place', 'plain', 'plane', 'plant', 'plate', 'point', 'pound', 'power', 'press',
    'price', 'pride', 'prime', 'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'queen',
    'quick', 'quiet', 'quite', 'radio', 'raise', 'range', 'rapid', 'ratio', 'reach', 'ready',
    'refer', 'right', 'rival', 'river', 'rough', 'round', 'route', 'royal', 'rural', 'scale',
    'scene', 'scope', 'score', 'sense', 'serve', 'seven', 'shape', 'share', 'sharp', 'sheet',
    'shelf', 'shell', 'shift', 'shirt', 'shock', 'shoot', 'sight', 'since', 'skill', 'sleep',
    'slide', 'small', 'smart', 'smile', 'smoke', 'solid', 'solve', 'sorry', 'sound', 'south',
    'space', 'spare', 'speak', 'speed', 'spend', 'split', 'sport', 'staff', 'stage', 'stand',
    'start', 'state', 'steam', 'steel', 'stick', 'still', 'stock', 'stone', 'store', 'storm',
    'story', 'strip', 'study', 'stuff', 'style', 'sugar', 'sweet', 'table', 'taste', 'teach',
    'thank', 'theme', 'there', 'thick', 'thing', 'think', 'third', 'throw', 'tight', 'title',
    'total', 'touch', 'tough', 'tower', 'track', 'trade', 'train', 'treat', 'trend', 'trial',
    'trust', 'truth', 'unite', 'upper', 'upset', 'urban', 'usual', 'valid', 'value', 'video',
    'virus', 'visit', 'vital', 'voice', 'waste', 'watch', 'water', 'wheel', 'where', 'which',
    'white', 'whole', 'whose', 'woman', 'world', 'worry', 'would', 'wound', 'write', 'wrong',
    'yield', 'young', 'youth'
]);

export default window.DICTIONARY; 