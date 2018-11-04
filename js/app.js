new Vue({
  el: '#app',
  data: {
    isStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    hitsLog: [],
  },
  methods: {
    startGame: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.hitsLog = [];
      this.isStarted = true;
    },
    turn: function (type = 'hit', multiplyer = 1) {
      const playersHit = getRandomArbitrary(1, 10 * multiplyer);
      const monstersHit = getRandomArbitrary();
      const playersTurn = makeTurn(playersHit, 'player', type);
      const monstertTurn = makeTurn(monstersHit, 'monster', 'hit');

      if (type === 'hit') {
        this.monsterHealth -= playersHit;
      } else {
        this.playerHealth += playersHit;
        if (this.playerHealth > 100) {
          this.playerHealth = 100;
        }
      }

      this.playerHealth -= monstersHit;

      this.hitsLog.push(playersTurn, monstertTurn);

      if (this.playerHealth <= 0) {
        alert('Monster win =(');
        this.beakGame();
      } else if (this.monsterHealth <= 0) {
        alert('You win =)')
        this.beakGame();
      }
    },
    beakGame: function () {
      this.isStarted = false;
    }
  },
});

function getRandomArbitrary(min = 1, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}

function makeTurn(damage, author, type) {
  return {
    value: damage,
    turn: author,
    type,
  };
}