<template>
  <v-app>
    <v-main>
      <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div>
            <label for="email">E-mail:</label>
            <input 
              type="email" 
              v-model="email" 
              id="email" 
              @focus="showInfo = true" 
              @blur="showInfo = false" 
              required
            >
          </div>
          <div>
            <label for="password">Senha:</label>
            <input type="password" v-model="password" id="password" required>
          </div>
          
          <button type="submit">Login</button>
        </form>
        <p>Não tem cadastro? <router-link to="/register">Cadastre-se</router-link></p>
      </div>

      <v-snackbar
        v-model="showError"
        :timeout="3000"
        color="#7830ab"
        top
        right
      >
        {{ errorMessage }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      showInfo: false,
      showError: false,
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/dashboard').catch(()=>{});
      } catch (error) {
        this.errorMessage = 'Usuário não registrado. Por favor, faça o registro.';
        this.showError = true;
        console.error('Erro ao realizar login:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
label {
  display: block;
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #DFD8EB;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #7830ab;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #7830ab;
}
.info-message {
  margin: 10px 0;
  font-size: 14px;
}
</style>
