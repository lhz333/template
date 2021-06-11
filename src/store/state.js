const state = {
  menuInit: localStorage.getItem('menuInit') ? JSON.parse(localStorage.getItem('menuInit')) : []
}

export default state