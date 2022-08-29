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

class PromisePool {
    constructor(max, fn) {
        this.max = max; //最大并发量
        this.fn = fn; //自定义的请求函数
        this.pool = []; //并发池
        this.urls = []; //剩余的请求地址
    }
    start(urls) {
        this.urls = urls; //先循环把并发池塞满
        while (this.pool.length < this.max) {
            let url = this.urls.shift();
            this.setTask(url);
        }
        //利用Promise.race方法来获得并发池中某任务完成的信号
        let race = Promise.race(this.pool);
        return this.run(race);
    }
    run(race) {
        race
            .then(res => {
                //每当并发池跑完一个任务，就再塞入一个任务
                let url = this.urls.shift();
                this.setTask(url);
                return this.run(Promise.race(this.pool));
            })
    }
    setTask(url) {
        if (!url) return
        let task = this.fn(url);
        this.pool.push(task); //将该任务推入pool并发池中
        console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`)
        task.then(res => {
            //请求结束后将该Promise任务从并发池中移除
            this.pool.splice(this.pool.indexOf(task), 1);
            console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
        })
    }
}
