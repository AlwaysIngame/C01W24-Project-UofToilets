import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ items, setFilteredItems }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredItems(filteredItems);
  }, [search, items, setFilteredItems]);

  return (
    <TextInput
      style={styles.search}
      value={search}
      onChangeText={setSearch}
      placeholder="Search for a washroom..."
    />
  );
};

const styles = StyleSheet.create({
  search: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default SearchBar;