const randomArrayIndex = (array) => {
    return Math.floor(Math.random() * array.length)
}

const randomArrayElement = (array) => {
    const index = randomArrayIndex(array)
    return array[index]
}

const randomObjectKey = (object) => {
    const keys = Object.keys(object)
    return randomArrayElement(keys)
}

const randomObjectValue = (object) => {
    const key = randomObjectKey(object)
    return object[key]
}

// TODO: HTML Code Playing Cards - https://www.htmlsymbols.xyz/games-symbols/playing-cards
class AloneInCyberspace extends HTMLElement {
    constructor() {
        super() 
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })

        this.setupAttributes()

        this.setupElements()

        this.setCommunityElements()
        this.setRollElements()
    }

    setupAttributes() {
        if (!this.getCommunities()) {
            this.setAttribute(AloneInCyberspace.communititiesAttributeKey, JSON.stringify(AloneInCyberspace.defaultCommunities))
        }

        if (!this.getPageLocations()) {
            this.setAttribute(AloneInCyberspace.pageLocationsAttributeKey, JSON.stringify(AloneInCyberspace.defaultPageLocations))
        }

        if (!this.getPageElementTopics()) {
            this.setAttribute(AloneInCyberspace.pageElementTopicsAttributeKey, JSON.stringify(AloneInCyberspace.defaultPageElementTopics))
        }

        if (!this.getPageElements()) {
            this.setAttribute(AloneInCyberspace.pageElementsAttributeKey, JSON.stringify(AloneInCyberspace.defaultPageElements))
        }
    }

    setupElements() {
        this.setupCommunityElements()

        this.setupRollElements()
    }

    getCommunities() {
        return JSON.parse(this.getAttribute(AloneInCyberspace.communititiesAttributeKey))
    }

    setupCommunityElements() {
        if (!this.community) {
            this.community = document.createElement('div')
            this.community.setAttribute('class', 'community')
            this.community.style = '\
                display: flex;\
                flex-direction: column;\
                margin: 1vw;\
            '

            this.communityTitle = document.createElement('div') 
            this.communityTitle.setAttribute('class', 'community-title')
            this.communityTitle.innerHTML = "Community"
            this.community.appendChild(this.communityTitle)

            this.communityContents = document.createElement('div')
            this.communityContents.setAttribute('class', 'community-contents')
            this.communityContents.style = '\
                display: flex;\
                flex-direction: row;\
                margin: 1vw;\
                height: 10vh;\
            '
            this.community.appendChild(this.communityContents)

            this.communityKey = document.createElement('div') 
            this.communityKey.setAttribute('class', 'community-key')
            this.communityKey.style = '\
                margin-right: 1vw;\
            '
            this.communityContents.appendChild(this.communityKey)

            this.communityValue = document.createElement('div') 
            this.communityValue.setAttribute('class', 'community-value')
            this.communityContents.appendChild(this.communityValue)

            this.shadowRoot.appendChild(this.community)
        }
    }

    setCommunityElements() {
        const communities = this.getCommunities()
        const communityKey = randomObjectKey(communities)

        this.communityKey.innerHTML = communityKey
        this.communityValue.innerHTML = communities[communityKey]
    }

    static communititiesAttributeKey = 'communities'

    static defaultCommunities = {
        'A': 'Goth',
        '2': 'Grunge',
        '3': 'Gamer',
        '4': 'Riot Grrl',
        '5': 'Hip Hop',
        '6': 'Anime Fan',
        '7': 'Hipster',
        '8': 'Spirituality',
        '9': 'Anarchist',
        '10': 'Conspiracy Theorist',
        'J': 'Cyberpunk',
        'Q': 'Heavy Metal',
        'K': 'LGBTIQA+'
    }

    setupRollElements() {
        if (!this.roll) {
            this.roll = document.createElement('div')
            this.roll.setAttribute('class', 'roll')
            this.roll.style = '\
                display: flex;\
                flex-direction: column;\
                margin: 1vw;\
            '
            
            this.rollTitle = document.createElement('div')
            this.rollTitle.setAttribute('class', 'roll-title')
            this.rollTitle.innerHTML = "Roll"
            this.rollTitle.style = '\
                display: none;\
            '
            this.roll.appendChild(this.rollTitle)
            
            this.rollButton = document.createElement('button')
            this.rollButton.setAttribute('class', 'roll-button')
            this.rollButton.innerHTML = "Roll"
            this.rollButton.addEventListener('click', () => {
                this.setRollElements()
            })
            this.roll.appendChild(this.rollButton)
            
            this.rollContents = document.createElement('div')
            this.rollContents.setAttribute('class', 'roll-contents')
            this.rollContents.style = '\
                display: flex;\
                flex-direction: row;\
                margin: 1vw;\
                flex-wrap: nowrap;\
                justify-content: space-between;\
                height: 10vh;\
            '
            this.roll.appendChild(this.rollContents)

            this.rollKey = document.createElement('div')
            this.rollKey.setAttribute('class', 'roll-key')
            this.rollKey.style = '\
                margin-left: 1vw;\
            '
            this.rollContents.appendChild(this.rollKey)
            
            this.rollValue = document.createElement('div')
            this.rollValue.setAttribute('class', 'roll-value')
            this.rollValue.style = '\
                margin-left: 1vw;\
            '
            this.rollContents.appendChild(this.rollValue)
            
            this.rollSameAsPrevious = document.createElement('div')
            this.rollSameAsPrevious.setAttribute('class', 'roll-same-as-previous')
            this.rollSameAsPrevious.style = '\
                width: 25vw;\
                min-width: 25vw;\
            '
            this.rollContents.appendChild(this.rollSameAsPrevious)

            this.shadowRoot.appendChild(this.roll)
        }

        this.setupCardElements(this.roll)
    }

    setRollElements() {
        const pageLocations = this.getPageLocations()
        const pageLocationKeys = Object.keys(pageLocations)
        const pageLocationKeysIndex = randomArrayIndex(pageLocationKeys)
        const roll = pageLocationKeys[pageLocationKeysIndex]

        const sameAsPrevious = this.previousRoll === roll
        this.rollSameAsPrevious.innerHTML = sameAsPrevious ? "Same as last" : "Different from last"

        this.rollKey.innerHTML = roll
        this.rollValue.innerHTML = pageLocations[roll]

        this.previousRoll = roll

        this.setCardElements(pageLocationKeysIndex + 1)
    }

    setupCardElements(parent) {
        if (!this.cards) {
            this.cards = document.createElement('div')
            this.cards.setAttribute('class', 'cards')
            parent.appendChild(this.cards)

            this.cardsTitle = document.createElement('div')
            this.cardsTitle.setAttribute('class', 'cards-title')
            this.cardsTitle.innerHTML = "Cards"
            this.cards.appendChild(this.cardsTitle)

            this.cardsList = document.createElement('ul')
            this.cardsList.setAttribute('class', 'cards-list')
            this.cards.appendChild(this.cardsList)
        }
    }

    setCardElements(count) {
        this.cardsList.innerHTML = ''

        const pageElements = this.getPageElements()
        const pageElementTopics = this.getPageElementTopics()

        const usedCards = []

        for (let index = 0; index < count; index++) {
            let pageElementKey = randomObjectKey(pageElements)
            let pageElementTopicKey = randomObjectKey(pageElementTopics)
            while(usedCards.includes(pageElementKey + pageElementTopicKey)) {
                pageElementKey = randomObjectKey(pageElements)
                pageElementTopicKey = randomObjectKey(pageElementTopics)
            }

            const card = document.createElement('li')
            card.setAttribute('class', 'card')

            const cardTitle = document.createElement('div')
            cardTitle.setAttribute('class', 'card-title')
            cardTitle.innerHTML = pageElementKey + pageElementTopicKey
            card.appendChild(cardTitle)

            const cardElement = document.createElement('div')
            cardElement.setAttribute('class', 'card-element')
            cardElement.innerHTML = pageElements[pageElementKey]
            card.appendChild(cardElement)

            const cardElementTopic = document.createElement('div')
            cardElementTopic.setAttribute('class', 'card-element-topic')
            cardElementTopic.innerHTML = pageElementTopics[pageElementTopicKey]
            card.appendChild(cardElementTopic)

            this.cardsList.appendChild(card)

            usedCards.push(pageElementKey + pageElementTopicKey)
        }
    }

    getPageLocations() {
        return JSON.parse(this.getAttribute(AloneInCyberspace.pageLocationsAttributeKey))
    }

    static pageLocationsAttributeKey = 'pageLocations'

    static defaultPageLocations = {
        '&#9856;': 'You see it listed in a search',
        '&#9857;': 'You see it listed in a search',
        '&#9858;': 'You find it in a webring, a small group of websites that are connected in a circular structure and are based on a specific theme. A webring often connects pages made by friends',
        '&#9859;': 'You find it in a webring, a small group of websites that are connected in a circular structure and are based on a specific theme. A webring often connects pages made by friends',
        '&#9860;': 'You spot it in a "neighborhood", a large community of similar web pages',
        '&#9861;': 'You spot it in a "neighborhood", a large community of similar web pages'
    }

    getPageElementTopics() {
        return JSON.parse(this.getAttribute(AloneInCyberspace.pageElementTopicsAttributeKey))
    }

    static pageElementTopicsAttributeKey = 'pageElementTopics'

    static defaultPageElementTopics = {
        '&#9826;': 'Diamonds are personal: Reflections on their personal life, family, job, tragedies, hobbies, love life, etc.',
        '&#9827;': 'Clubs are objects valued by the page creator: Favorite television shows, video games, books, sports teams, drugs, bands, etc.',
        '&#9825;': 'Hearts are connections with other web users: Friendships, flame wars, crushes, trolling, etc.',
        '&#9824;': 'Spades are about the world around them: Politics, religion, nature, monuments, thoughts about the end of the millennium, etc.',
    }

    getPageElements() {
        return JSON.parse(this.getAttribute(AloneInCyberspace.pageElementsAttributeKey))
    }

    static pageElementsAttributeKey = 'pageElements'

    static defaultPageElements = {
        'A': 'Webring button',
        '2': 'HTML Table',
        '3': 'Scrolling text',
        '4': 'Animated gif',
        '5': 'A paragraph of text',
        '6': 'List',
        '7': 'File download',
        '8': 'Blog posting',
        '9': 'Jpeg',
        '10': 'Guest book comment',
        'J': 'Auto playing music',
        'Q': 'Link to another page',
        'K': 'Compressed video'
    }
}

customElements.define('alone-in-cyberspace', AloneInCyberspace)