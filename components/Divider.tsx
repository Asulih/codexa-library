import { StyleSheet, Text, View } from 'react-native'

type DividerProps = {
  children: string
}

const Divider = ({children}: DividerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={styles.content} >
        <Text>{children}</Text>
      </View>
      <View style={styles.border} />
    </View>
  )
}

export default Divider

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  border: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  },
  content: {
    paddingHorizontal: 10,
  },
})