<!-- <template>
    <div>
      <h1>Lista de Alunos</h1>
      <div v-if="loading">Carregando...</div>
      <div v-else>
        <ul>
          <li v-for="aluno in alunos" :key="aluno.id">
            {{ aluno.nome }} - {{ aluno.curso }}
            <button @click="editarAluno(aluno)">Editar</button>
            <button @click="excluirAluno(aluno.id)">Excluir</button>
          </li>
        </ul>
        <button @click="adicionarAluno">Adicionar Aluno</button>
      </div>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  
  export default {
    data() {
      return {
        alunos: [],
        loading: false
      }
    },
    created() {
      this.carregarAlunos()
    },
    methods: {
      async carregarAlunos() {
        this.loading = true
        const snapshot = await firebase.firestore().collection('alunos').get()
        this.alunos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        this.loading = false
      },
      async adicionarAluno() {
        const nome = prompt('Digite o nome do aluno:')
        const curso = prompt('Digite o curso do aluno:')
        if (nome && curso) {
          await firebase.firestore().collection('alunos').add({ nome, curso })
          this.carregarAlunos()
        }
      },
      async editarAluno(aluno) {
        const novoNome = prompt('Digite o novo nome do aluno:', aluno.nome)
        const novoCurso = prompt('Digite o novo curso do aluno:', aluno.curso)
        if (novoNome !== null && novoCurso !== null) {
          await firebase.firestore().collection('alunos').doc(aluno.id).update({ nome: novoNome, curso: novoCurso })
          this.carregarAlunos()
        }
      },
      async excluirAluno(id) {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
          await firebase.firestore().collection('alunos').doc(id).delete()
          this.carregarAlunos()
        }
      }
    }
  }
  </script>
   -->