<template>
    <div class="amount">
      <h2>Enter the number of questions</h2>
      <input type="number" v-model="amount" min="5" max="20" required>      
    </div>

    <div class="difficulty">
      <h2>Chose The Difficulty</h2>
      <label>
        <input type="radio" value="hard" v-model="difficulty" required>
        <span>Hard</span>
      </label>
      <label>
        <input type="radio" value="medium" v-model="difficulty" required>
        <span>Medium</span>
      </label>
      <label>
        <input type="radio" value="easy" v-model="difficulty" required>
        <span>Easy</span>
      </label>
    </div>

    <div class="categories">
      <h2>Chose The Category</h2> 
      <div class="error">{{error}}</div>  
        <select v-model="category" required>
          <option v-for="category in categories.trivia_categories" 
            :key="category"
            :value="category.id" >
            {{ category.name }}
          </option> 
        </select>      
    </div>
    
    <div class="buttons">
      <button @click="startPlaying">Start Playing</button>
    </div>
</template>