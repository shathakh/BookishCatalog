const users= [
    {
        firstName : "Ahmed",
        lastName: "Ali",
        email: "ahmed@gmail.com",
        password: "$2y$12$50bfKDzQf6qW6zd0OyPQue74lATfbaUcKCvYluWgLrktoobcq8oq." //123456
    },
    {
        firstName : "Karam",
        lastName: "Alaa",
        email: "karam@gmail.com",
        password: "$2y$12$50bfKDzQf6qW6zd0OyPQue74lATfbaUcKCvYluWgLrktoobcq8oq." //123456
    },
    {
        firstName : "Amal",
        lastName: "Salem",
        email: "amal@gmail.com",
        password: "$2y$12$50bfKDzQf6qW6zd0OyPQue74lATfbaUcKCvYluWgLrktoobcq8oq." //12345
    },
]

const books = [
    {
        author: "Bill Bryson",
        title: "A Walk in the Woods",
        description: "The Appalachian Trail stretches from Georgia to Maine and covers some of the most breathtaking terrain in America—majestic mountains, silent forests, sparking lakes. If you’re going to take a hike, it’s probably the place to go. And Bill Bryson is surely the most entertaining guide you’ll find. ",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388189974i/9791.jpg",
        userId: 1
    },
    {
        author: "Frances Mayes",
        title: "Every Day in Tuscany",
        description: "In this sequel to her New York Times bestsellers Under the Tuscan Sun and Bella Tuscany, the celebrated bard of Tuscany (New York Times) lyrically chronicles her continuing, two decades-long love affair with Tuscany's people, art, cuisine, and lifestyle.Frances Mayes offers her readers a deeply personal memoir of her present-day life in Tuscany,",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442786132i/6891512.jpg",
        userId: 1
    },
    {
        author: "Elizabeth Gilbert",
        title: "Eat, Pray, Love",
        description: "A celebrated writer's irresistible, candid, and eloquent account of her pursuit of worldly pleasure, spiritual devotion, and what she really wanted out of life Around the time Elizabeth Gilbert turned thirty, she went through an early-onslaught midlife crisis",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503066414i/19501.jpg",
        userId: 1
    },
    {
        author: "David Grann",
        title: "The Lost City of Z",
        description: "A grand mystery reaching back centuries. A sensational disappearance that made headlines around the world. A quest for truth that leads to death, madness or disappearance for those who seek to solve it. The Lost City of Z is a blockbuster adventure narrative about what lies beneath the impenetrable jungle canopy of the Amazon.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320487318i/3398625.jpg",
        userId: 1
    },
    {
        author: " Cheryl Strayed",
        title: "Wild",
        description: "At twenty-two, Cheryl Strayed thought she had lost everything. In the wake of her mothers death, her family scattered and her own marriage was soon destroyed. Four years later, with nothing more to lose, she made the most impulsive decision of her life. With no experience or training, driven only by blind will",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1453189881i/12262741.jpg",
        userId: 1
    },
    {
        author: " Monica Wood ",
        title: "Description",
        description: "Description is most powerful when it's visible, aural, tactile. Make your descriptions fresh and they'll move your story forward, imbue your work with atmosphere, create that tang of feeling that editors cry for and readers crave.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348968286i/139603.jpg",
        userId: 1
    },
    {
        author: " Lisa Napoli",
        title: "Radio Shangri-la",
        description: "Lisa Napoli was in the grip of a crisis, dissatisfied with her life and her work as a radio journalist. When a chance encounter with a handsome stranger presented her with an opportunity to move halfway around the world, Lisa left behind cosmopolitan Los Angeles for a new adventure in the ancient Himalayan kingdom ",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1332189268i/7494591.jpg",
        userId: 2
    },
    {
        author: " Karen Katz",
        title: "The Colors of Us",
        description: "A positive and affirming look at skin color, from an artist's perspective. Seven-year-old Lena is going to paint a picture of herself. She wants to use brown paint for her skin. But when she and her mother take a walk through the neighborhood, Lena learns that brown comes in many different shades.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388289045i/19600.jpg",
        userId: 2
    },
    {
        author: " Peter Hessler ",
        title: "Country Driving",
        description: "From the bestselling author of Oracle Bones and River Town comes the final book in his award-winning trilogy, on the human side of the economic revolution in China. In the summer of 2001, Peter Hessler, the longtime Beijing correspondent for The New Yorker, acquired his Chinese driver's license.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564999953i/6945572.jpg",
        userId: 2
    },
    {
        author: " Linda Leaming ",
        title: "Married to Bhutan",
        description: "Tucked away in the eastern end of the Himalayas lies Bhutan—a tiny, landlocked country bordering China and India. Impossibly remote and nearly inaccessible, Bhutan is rich in natural beauty, exotic plants and animals, and crazy wisdom.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328769028i/9463102.jpg",
        userId: 2
    },
    {
        author: "Brad Herzog",
        title: "Turn Left At The Trojan Horse",
        description: "Turn Left at the Trojan Horse has been described as On the Road meets Eat, Pray, Love because it goes well beyond a road trip. More than just a funny and profound narrative of Brad Herzog's cross-country trek toward a college reunion in Ithaca (New York) and more than another reimagining of Odysseus's ancient journey",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347659621i/7798030.jpg",
        userId: 2
    },
    {
        author: "Charles Boyce",
        title: "Dictionary of Furniture",
        description:"This work is a comprehensive listing of terms that refer to furniture - its style, manufacture and makers in all countries and cultures from earliest times to the present. It deals with details of construction, cabinet makers and aesthetic terminology." ,
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1519664181i/6930542.jpg",
        userId: 3
    },
    {
        author: "John Flanagan",
        title: "The Ruins of Gorlan",
        description:"They have always scared him in the past — the Rangers, with their dark cloaks and shadowy ways. The villagers believe the Rangers practice magic that makes them invisible to ordinary people. And now 15-year-old Will, always small for his age, has been chosen as a Ranger's apprentice. " ,
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1293952830i/60400.jpg",
        userId: 3
    },
    {
        author: "David Grann",
        title: "The Wager",
        description:"Times bestselling author of Killers of the Flower Moon, a page-turning story of shipwreck, survival, and savagery, culminating in a court martial that reveals a shocking truth. The powerful narrative reveals the deeper meaning of the events on The Wager" ,
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1659407155i/61714633.jpg",
        userId: 3
    },
    {
        author: "David Grann",
        title: "The White Darkness",
        description:"Henry Worsley was a devoted husband and father and a decorated British special forces officer who believed in honor and sacrifice. He was also a man obsessed. He spent his life idolizing Ernest Shackleton" ,
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1596753963i/39723730.jpg",
        userId: 3
    },
]

module.exports = {users, books}