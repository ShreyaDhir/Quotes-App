import React, { useState, useEffect, Fragment } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

function useQuote() {
  const [quote, setQuote] = useState([true]);
  // const [currentQuote, setCurrentQuote] = useState({ quote: "", author: "" });

	useEffect(() => {
		updateQuote()
  }, [])
  
	function updateQuote() {
		fetch("http://localhost:3004/quotes/")
      .then((response) => response.json())
      
      .then((quotes) => {
        console.log(quotes);
        const randomIndex = Math.floor(Math.random() * quotes.length)
        
				setQuote(quotes[randomIndex])
      })
      .catch(err => {
        // return (err_
        console.log(err)
        return err
      }
    )
	}

	return { quote, updateQuote }
}

export default function App() {
	const { quote, updateQuote } = useQuote()
  console.log(quote)
  alert(quote)
  return (
		<View style={styles.container}>
			{quote && (
				<Fragment>
					<Text style={styles.quoteText}>{quote.text}</Text>
					<Text style={styles.quoteAuthor}>{quote.author}</Text>
					<Button onPress={updateQuote} title="Show Me Another Quote!" />
				</Fragment>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "aqua",
		alignItems: "center",
		justifyContent: "center",
		padding: 50,
	},
  quoteText: {
    color: "black",
		textAlign: "center",
    fontSize: 18,
    marginTop: 25,
    width: 400,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 1,
	},
  quoteAuthor: {
    color: "black",
    textAlign: "center",
		fontSize: 18,
    marginTop: 25,
    width: 400,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 30,
	},
})