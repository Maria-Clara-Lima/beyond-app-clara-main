<template>
  <v-app>
    <v-main>
      <div class="register">
        <h2>Registro</h2>
        <form @submit.prevent="register">
          <div>
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" required>
          </div>
          <div>
            <label for="password">Senha:</label>
            <input type="password" v-model="password" id="password" required>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/firebaseAuth.js';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        alert('Usuário registrado com sucesso!');
        this.$router.push('/#'); // Redirecionar para a tela de login após o registro
      } catch (error) {
        alert('Erro ao registrar usuário: E-mail já cadastrado.' );
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
label {
  display: block;
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #7830ab;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #5e2591;
}
</style>
