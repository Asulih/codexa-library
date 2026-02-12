import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfilePage = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'
      style={styles.container}>
      <Text>ProfilePage</Text>
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})