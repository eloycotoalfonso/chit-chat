# chit-chat

This is a Chat app created with react native for movile devices and web browsers. The app will provide users with a chat interface, as well as options to share some documents such as images, location, and so on.

# Dependencies
 - React Native
 - Expo
 - Gifted Chat
 - Google firestore Database and storage
 
# Moto of the app

This app is develop under the request of some users. These are their stories:
- As A new user, I want to be able to easily enter a chat room so I can quickly start talking with friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

# Dependencies

- "@expo/webpack-config": "^0.17.2",
- "@react-native-async-storage/async-storage": "~1.17.3",
- "@react-native-community/masked-view": "^0.1.11",
- "@react-native-community/netinfo": "9.3.5",
- "@react-navigation/native": "^6.1.2",
- "@react-navigation/stack": "^6.3.11",
- "expo": "~47.0.12",
- "expo-image-picker": "~14.0.2",
- "expo-location": "~15.0.1",
- "expo-permissions": "~14.0.0",
- "expo-status-bar": "~1.4.2",
- "firebase": "8.10.1",
- "react": "18.1.0",
- "react-dom": "18.1.0",
- "react-native": "0.70.5",
- "react-native-gesture-handler": "~2.8.0",
- "react-native-gifted-chat": "^1.1.1",
- "react-native-maps": "1.3.2",
- "react-native-reanimated": "~2.12.0",
- "react-native-safe-area-context": "4.4.1",
- "react-native-screens": "~3.18.0",
- "react-native-web": "~0.18.9"

# Set Up
- Download the project with: gh repo clone eloycotoalfonso/chit-chat // https://github.com/eloycotoalfonso/chit-chat.git
- Install the project (Due to some incombatibilies with npm, it is highly recommended to use yarn.)
- Run npm start

### If you want to use your own database:
- Open a firestore account with your google credentials.
- Create a database (normal database, not real time one).
- Enhable anonymous authorization.
- Allow read and write from external sources under Database - rules, and changing "allow read, write: if false;" for "allow read, write: if request.time > timestamp.date(2020, 9, 10);"
- Copy your database configuration in the initializeApp function in the Chat.js file.

### Notes
- In order to use the app and develop it expo is neede to be globaly installed before running npm start.
npm install -g expo-cli
- Due to a continious development, depencies version might be depecated. Check out the newer versions released.