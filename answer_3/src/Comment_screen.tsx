import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from './data.json';

interface dataComment {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  username: string;
  replyingTo?: number;
  childCmt?: dataComment[];
}

const Comment_screen = () => {
  const [dataAfterResolve, setDataAfterResolve] = useState([] as dataComment[]);

  // resolve data
  useEffect(() => {
    const dataInput: dataComment[] = data;
    const initArr: dataComment = data[0];
    initArr.childCmt = [] as dataComment[];
    const arrResolve: dataComment[] = [JSON.parse(JSON.stringify(initArr))];

    // const dataChild_1 = dataInput.filter(item => item.replyingTo);
    
    // for(let i = 0; i < dataChild_1.length; i++){
    //   for(let j = 1; j < dataChild_1.length; j++){
    //     if(dataChild_1[i].)
    //   }
    // }

    // for (let i = 1; i < dataInput.length; i++) {
    //   if (dataInput[i].replyingTo) {
    //     for (let j = 0; j < arrResolve.length; j++) {
    //       if (dataInput[i].replyingTo === arrResolve[j].id) {
    //         arrResolve[j].childCmt?.push(dataInput[i]);
    //       } else if (arrResolve[j].childCmt?.length !== 0) {
    //         // loop resolve
    //         const childData: dataComment[] = arrResolve[j].childCmt;
    //         const dataPush: dataComment = dataInput[i];
    //       }
    //     }
    //   } else {
    //     arrResolve.push({...dataInput[i], childCmt: []});
    //   }
    // }
    setDataAfterResolve(arrResolve);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {dataAfterResolve.map((item, index) => {
        return (
          <View key={index}>
            {item.replyingTo}
            <Text>{item.username}</Text>
            <Text>{item.username}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default Comment_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
