import React from 'react'
import { StyleSheet } from 'react-native'

const Text = ({text, weight}) => {
  return (
    <Text >{text}</Text>
  )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: `quicksand-${weight}`,
    }
})

export default Text