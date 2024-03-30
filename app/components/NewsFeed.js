import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Touchable } from 'react-native';
import SearchBar from './SearchBar'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BORDER_COLOR } from './styles';
import { getAddress } from '../src/googlePlaces';
import UIButton from './ui/UIButton';
import { SERVER_URL } from '../src/constants';

const NewsFeed =  ({ washrooms, onSelect }) => {
  const [filteredItems, setFilteredItems] = useState(washrooms);
  const [news, setNews] = useState([]);

  

  const fetchNews = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/getNews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
      const newnews = await response.json();
      setNews(newnews.response);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

useEffect(() => {
    fetchNews();
}, []);

  return (
    <ScrollView>
        {news.length > 0 ? (
            news.map((news, index) => (
            <View style={styles.item} key={news.id}>
              <Text style={styles.title}>{news.title}</Text>
              <Text style={styles.date}>{news.date}</Text>
              <Text style={styles.content}>{news.content}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItems}>No news found</Text>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  noItems: {
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default NewsFeed;
