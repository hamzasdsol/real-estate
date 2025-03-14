import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, remove, update } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);


export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// 🔹 Function to log out user and clear session
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user"); // Remove user session
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

// 🔹 Function to check auth state on page reload
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
      callback(userData); // Invoke the callback with user data
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage when logged out
      callback(null); // Invoke the callback with null
    }
  });
};

// Function to fetch property listings
export const fetchListings = async () => {
  const dbRef = ref(db, "properties");
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to add a new property to Firebase
export const addPropertyToFirebase = async (propertyData) => {
  try {
    console.log("Adding property:", propertyData);
    await push(ref(db, "properties"), propertyData);
    alert("Property added successfully!");
  } catch (error) {
    console.error("Error adding property:", error);
  }
};

// Function to delete a property from Firebase
export const deleteListing = async (id) => {
  try {
    const propertyRef = ref(db, `properties/${id}`);
    await remove(propertyRef);
    console.log("Property deleted successfully!");
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// Function to update a property in Firebase
export const updateListing = async (id, updatedData) => {
  try {
    const propertyRef = ref(db, `properties/${id}`);
    await update(propertyRef, updatedData);
    console.log("Property updated successfully!");
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

export { db, auth, app };
