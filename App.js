import React,{ useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import * as Speech from "expo-speech";

function AnimatronicCard({ name, image,game }) {
  const uri = image || 'https://placehold.it/150x150';

  function speakNameOfAnimatronic(){
    Speech.stop()
    if(!name) return
    Speech.speak(`${name} of ${game}`, { language: 'en-us', rate: 0.9 });
  }

  return (
    <TouchableOpacity style={styles.animatronicCard} onPress={speakNameOfAnimatronic}>
      <Image style={styles.animatronicImage} source={{ uri }} />
      <Text style={styles.animatronicText}>{name}</Text>
      <Text style={styles.animatronicGame}>{game}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [animatronics,setAnimatronics] = useState([]);
  useEffect(async() => {
    const animatronicsOfApi = await fetch('https://fnaf-web.vercel.app/api/v1/all');
    const animatronicsOfApiJson = await animatronicsOfApi.json();

    setAnimatronics(animatronicsOfApiJson);
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={animatronics}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <AnimatronicCard name={item.name} image={item.image}  game={item.game} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:2
  },
  animatronicCard: {
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20,
  },
  animatronicImage: { 
    minWidth: 150,
    minHeight: 150, 
    maxWidth: 250,
    maxHeight: 250,
    borderRadius: 5 ,
    backgroundColor:'#ccc'
  },
  animatronicText: { 
    fontSize: 20 
  },
  animatronicGame:{
    fontSize: 9
  }
});
