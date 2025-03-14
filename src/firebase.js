import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, remove, update } from "firebase/database";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAhud7Y62fYq1a-CQ-mQ6r2ltl67X-Bgi8",
  authDomain: "real-estate-ca394.firebaseapp.com",
  projectId: "real-estate-ca394",
  storageBucket: "real-estate-ca394.appspot.com",
  messagingSenderId: "141174544077",
  appId: "1:141174544077:web:27cec332309460d9f6fb84",
  measurementId: "G-1CKDNS852F",
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
