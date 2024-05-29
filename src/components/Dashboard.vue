  <template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#DFD8EB">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://tse3.mm.bing.net/th?id=OIP.r3X2hhGxdRaQjwuihyzFMAHaHa&pid=Api&P=0&h=180">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Administrador</v-list-item-title>
            <v-list-item-subtitle>admin@beyond.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#DFD8EB">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="#40169C"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Beyond logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://beyondcompany.com.br/img/logo.62069458.svg"
          width="200"
        />
      </div>
    </v-app-bar>

    <v-main>
      <v-content>
        <template>
          <v-data-table
            :headers="headers"
            :items="alunos"
            hide-default-footer
            sort-by="matricula"
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Alunos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                     Adicionar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nome" label="Aluno" @keypress="onlyLetters($event)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.matricula" label="Matrícula" @keypress="onlyNumbers($event)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.cpf" label="CPF" @keypress="onlyNumbersAndSymbols($event)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.curso" label="Curso" @keypress="onlyLetters($event)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza que quer deletar esse item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-content>
      <div class="logout-button">
        <v-btn color="primary" @click="logout">Sair</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import { db } from '../firebase/firebaseAuth.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Aluno', align: 'start', sortable: false, value: 'nome' },
      { text: 'Matrícula', value: 'matricula' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Curso', value: 'curso' },
      { text: 'E-mail', value: 'email' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    alunos: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      matricula: '',
      cpf: '',
      curso: '',
      email: '',
    },
    defaultItem: {
      nome: '',
      matricula: '',
      cpf: '',
      curso: '',
      email: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo registro' : 'Editar registro'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.fetchAlunos();
  },

  methods: {
    async fetchAlunos() {
      const alunosCollection = collection(db, 'alunos');
      const alunosSnapshot = await getDocs(alunosCollection);
      this.alunos = alunosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    onlyLetters(event) {
      const charCode = event.which ? event.which : event.keyCode;
      const charStr = String.fromCharCode(charCode);
      if (!/^[a-zA-ZáàâãäåçéèêëíìîïñóòôõöúùûüýÿÁÀÂÃÄÅÇÉÈÊËÍÌÎÏÑÓÒÔÕÖÚÙÛÜÝŸ ]+$/.test(charStr)) {
        event.preventDefault();
      }
    },

    onlyNumbers(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },

    onlyNumbersAndSymbols(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (
        (charCode < 48 || charCode > 57) && // 0-9
        charCode !== 45 && // -
        charCode !== 46 // .
      ) {
        event.preventDefault();
      }
    },

    editItem(item) {
      this.editedIndex = this.alunos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.alunos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const id = this.alunos[this.editedIndex].id;
      await deleteDoc(doc(db, 'alunos', id));
      this.alunos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        // Atualizar documento existente
        const id = this.alunos[this.editedIndex].id;
        const alunoDoc = doc(db, 'alunos', id);
        await updateDoc(alunoDoc, this.editedItem);
        Object.assign(this.alunos[this.editedIndex], this.editedItem);
      } else {
        // Adicionar novo documento
        const alunosCollection = collection(db, 'alunos');
        const docRef = await addDoc(alunosCollection, this.editedItem);
        this.alunos.push({ id: docRef.id, ...this.editedItem });
      }
      this.close();
    },

    logout() {
      localStorage.removeItem('loggedIn');
      this.$router.push('/');
    }
  },
};
</script>

<style>
.logout-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style> 