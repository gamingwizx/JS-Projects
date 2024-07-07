/**
 * Activity 1: Call the provided function getValueWithDelay
 * twice and print out the returned value, then call the
 * provided function getValueWithDelayError and make sure the
 * error is properly caught. (Practicing async/await.)
 */
function getValueWithDelay(value, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(value), delay)
	})
}

function getValueWithDelayError(value, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => reject("Error"), delay)
	})
}

async function activity1() {
	try {
		const value1 = await getValueWithDelay("one", 1000)
		console.log(value1)
		const value2 = await getValueWithDelay("two", 1000)
		console.log(value2)
		const value3 = await getValueWithDelayError("three", 1000)
		console.log(value3)
	} catch (error) {
		console.error(error)
	}
}

activity1()
