class Fruit {
    constructor(name, size, calories, hangman, sweetness, rarity) {
        this.name = name
        this._winCount = 0
        this.size = size
        this.calories = calories
        this.hangman = hangman
        this.sweetness = sweetness
        this.rarity = rarity
    }

    get info() {
        return `NAME: ${this.name}`
            + `\n[1] SIZE: ${this.size}`
            + `\n[2] CALORIES: ${this.calories}`
            + `\n[3] HANGMAN RATING: ${this.hangman}`
            + `\n[4] SWEETNESS: ${this.sweetness}`
            + `\n[5] RARITY: ${this.rarity}`
    }

    get winCount() {
        return this._winCount
    }

    set winCount(value) {
        this._winCount = value
        console.log(`The ${this.name} card has won ${this._winCount} hands`)
    }

    getAttribute(index) {
        if (index == 1) {
            return this.size
        } else if (index == 2) {
            return this.calories
        } else if (index == 3) {
            return this.hangman
        } else if (index == 4) {
            return this.sweetness
        } else if (index == 5) {
            return this.rarity
        } else {
            return false
        }
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }
}


class Game {
    constructor(deck) {
        this.deck = deck
        this.reset()
    }

    reset() {
        this.currentPlayer = 0
        this.pot = 0
        this.currentCard = 0
        this.players = []
        this.deck = this.shuffle(this.deck)
        this.playGame()
    }

    shuffle(deck) {
        for (let i = 0; i < deck.length - 1; i++) {
            const random = Math.ceil(Math.random() * (deck.length - i));
            [deck[i], deck[random]] = [deck[random], deck[i]]
        }
        return deck
    }

    setPlayers() {
        let playerCount = 0

        while (!["2","3","4"].includes(playerCount)) {
            playerCount = prompt(`Enter number a of players between 2 and 4`)
        }

        for (let i = 0; i < playerCount; i++) {
            this.players.push(new Player(`Player ${i + 1}`))
        }
    }

    playHand() {
        const hand = this.deck.slice(this.currentCard, this.players.length + this.currentCard)
        let attribute
        this.pot += this.players.length

        while (!["1","2","3","4","5"].includes(attribute)) {
            attribute = prompt(`PLAYER${this.currentPlayer + 1}\n`
                + `${hand[this.currentPlayer].info}\n`
                + `Select an attribute (using a number from 1-5)`)
        }


        const winningValue = 
            Math.max(...hand.map(card => card.getAttribute(attribute)))
        const winningIndexes = hand
            .map((card, i) => card.getAttribute(attribute) === winningValue ? i : "")
            .filter(value => value !== "")

        if (winningIndexes.length === 1) {
            this.currentPlayer = winningIndexes[0]
            this.players[this.currentPlayer].score += this.pot
            hand[this.currentPlayer].winCount += 1
            this.pot = 0
            console.log(`Player${this.currentPlayer + 1} won the hand`)
        } else {
            console.log("The hand was drawn")
        }

        this.currentCard += this.players.length
    }

    playGame() {
        this.setPlayers()

        while (this.currentCard < this.deck.length - this.players.length) {
            this.playHand()
        }

        console.log("GAME OVER")
        this.players.sort((a, b) => b.score - a.score).forEach(player => {
            console.log(`${player.name}: ${player.score}`)
        })

        this.reset()
    }

}

const populateDeck = () => {
    const deck = []

    // size  calories  hangman  sweetness  rarity

    deck.push(new Fruit("apple", 182, 95, 5, 6, 1))
    deck.push(new Fruit("avocado", 150, 250, 3, 1, 5))
    deck.push(new Fruit("banana", 118, 105, 1, 6, 2))
    deck.push(new Fruit("blackberry", 6, 3, 3, 8, 2))
    deck.push(new Fruit("breadfruit", 2000, 2100, 1, 1, 8))
    deck.push(new Fruit("cherry", 11, 50, 5, 7, 4))
    deck.push(new Fruit("coconut", 1400, 1400, 2, 3, 5))
    deck.push(new Fruit("durian", 1500, 1350, 3, -10, 8))
    deck.push(new Fruit("gooseberry", 5, 2, 1, -1, 4))
    deck.push(new Fruit("grapefruit", 200, 104, 2, -5, 4))
    deck.push(new Fruit("grape", 5, 4, 3, 6, 3))
    deck.push(new Fruit("guava", 55, 50, 8, 4, 7))
    deck.push(new Fruit("jackfruit", 15000, 14000, 4, 1, 6))
    deck.push(new Fruit("kiwi", 75, 45, 8, 6, 3))
    deck.push(new Fruit("kumquat", 14, 13, 10, 3, 7))
    deck.push(new Fruit("lemon", 70, 20, 3, -4, 2))
    deck.push(new Fruit("lime", 44, 11, 4, -3, 2))
    deck.push(new Fruit("lychee", 20, 18, 8, 5, 7))
    deck.push(new Fruit("mango", 200, 202, 1, 6, 5))
    deck.push(new Fruit("olive", 5, 8, 2, 0, 4))
    deck.push(new Fruit("orange", 88, 60, 3, 6, 1))
    deck.push(new Fruit("papaya", 1700, 600, 2, 3, 5))
    deck.push(new Fruit("peach", 150, 60, 4, 5, 3))
    deck.push(new Fruit("pineapple", 900, 452, 1, 7, 4))
    deck.push(new Fruit("plum", 80, 30, 5, 6, 2))
    deck.push(new Fruit("pomegranate", 300, 230, 3, 4, 5))
    deck.push(new Fruit("raspberry", 4, 1, 2, 5, 2))
    deck.push(new Fruit("rhubarb", 700, 70, 6, -5, 2))
    deck.push(new Fruit("strawberry", 10, 6, 2, 4, 2))
    deck.push(new Fruit("watermelon", 5000, 1600, 3, 6, 4))

    return deck
}

new Game(populateDeck())