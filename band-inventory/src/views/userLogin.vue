<template>
	<div>
	<h1> Log In Page </h1>
	<div class="inputContainer">
		<label for="email"> Email: </label>
		<input type="email" id="email" v-model="user">
	</div>

	<div class="inputContainer">
		<label for="email"> Password: </label>
		<input type="password" id="password" v-model="pass">
	</div>
	<button @click="signIn">Sign In</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import router from '@/routes'

const user = ref("")
const pass = ref("")

async function signIn(){
	try {
		const { error } = await supabase.auth.signInWithPassword({
  		email: user.value,
  		password: pass.value,
		})

		if (error) {
			alert(error);
			throw error
		} else {
			console.log("sucessfully logged in!")
			router.push({ path: '/test' })
		}
		
	} catch (error) {
		console.log(error)
	}
}


// const instruments = ref([])

// async function getInstruments() {
//   const { data } = await supabase.from('instruments').select()
//   instruments.value = data
// }

// onMounted(() => {
//    getInstruments()
// })


</script>

<style>

</style>