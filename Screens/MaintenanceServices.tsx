import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../comp/BackButton";
import RecommendationsCategory from "../comp/RecommendationsCategory";

const MaintenanceServices: React.FC = () => {
  return <RecommendationsCategory category="Maintenance services" />;
};

export default MaintenanceServices;
