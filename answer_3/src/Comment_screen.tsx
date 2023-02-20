import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from './data.json';
import moment from 'moment';
interface dataComment {
  id: number;
  content: string;
  createdAt: number | string;
  score: number;
  username: string;
  replyingTo?: number;
  childCmt?: dataComment[];
}

const Comment_screen = () => {
  const [dataAfterResolve, setDataAfterResolve] = useState([] as dataComment[]);

  // resolve data
  useEffect(() => {
    const dataInput: dataComment[] = data.map((item, _) => {
      return {
        ...item,
        childCmt: [] as dataComment[],
      };
    });
    // sort array
    for (let i = 0; i < dataInput.length; i++) {
      for (let j = i; j < dataInput.length; j++) {
        if (dataInput[i].createdAt < dataInput[j].createdAt) {
          let temp = dataInput[i];
          dataInput[i] = dataInput[j];
          dataInput[j] = temp;
        }
      }
    }
    // push data
    for (let i = 0; i < dataInput.length; i++) {
      for (let j = 0; j < dataInput.length; j++) {
        if (dataInput[i].id === dataInput[j].replyingTo) {
          dataInput[i].childCmt?.push(dataInput[j]);
        }
      }
    }
    const finalData = dataInput.filter(item => item.replyingTo === undefined);
    setDataAfterResolve(finalData);
  }, []);

  const ViewComment = (dataCmt: dataComment) => {
    return (
      <View style={styles.boxCmt}>
        <Text>NAME: {dataCmt.username}</Text>
        <Text>CONTENT: {dataCmt.content}</Text>
        <Text>
          CREATE AT: {moment(dataCmt.createdAt).format('DD/MM/YYYY hh:mm:ss')}
        </Text>
        <View style={styles.viewScore}>
          <Text>Like: {dataCmt.score}</Text>
          <Text>Cmt: {dataCmt.childCmt?.length}</Text>
        </View>
      </View>
    );
  };

  const _renderItemChild = (_item: dataComment[], _idx: number): any => {
    return (
      <>
        {_item.map((_itemChild: dataComment, _idxChild: number) => {
          return (
            <View
              key={`${_idx}_${_itemChild.username}`}
              style={styles.marginLeft}>
              {ViewComment(_itemChild)}
              {_itemChild.childCmt && _itemChild.childCmt?.length !== 0 && (
                <>{_renderItemChild(_itemChild.childCmt, _idxChild)}</>
              )}
            </View>
          );
        })}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {dataAfterResolve.map((item, index) => {
          return (
            <View key={`${index}_${item.username}`}>
              {ViewComment(item)}
              {item.childCmt && item.childCmt?.length !== 0 && (
                <>{_renderItemChild(item.childCmt, index)}</>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Comment_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  boxCmt: {
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    zIndex: 100,
  },
  marginLeft: {marginLeft: 40},
  viewScore: {
    position: 'absolute',
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    right: 10,
    bottom: -10,
    borderColor: '#ccc',
    minWidth: 150,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});
