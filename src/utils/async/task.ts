/**
 * 写一个函数，可以控制最大并发数
 */
function concurrentPoll() {
  this.tasks = [];
  this.max = 10;
  setTimeout(() => {
    this.run();
  }, 0);
}
concurrentPoll.prototype.addTask = function (task) {
  this.tasks.push(task);
};
concurrentPoll.prototype.run = function () {
  if (this.tasks.length == 0) {
    return;
  }
  var min = Math.min(this.tasks.length, max);
  for (var i = 0; i < min; i++) {
    this.max--;
    var task = this.tasks.shift();
    task()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.max++;
        this.run();
      });
  }
};
