/**
 * Pubsub
 * 使用场景: Pubsub.sub('messageTopic', (...args) => { console.log('监听处理') })
 *         Pubsub.pub('messageTopic', 'text1', 'text2', ....'text3')
 */

interface PubsubModel {
  topicMap: {
    [key: string]: Function[]
  }
  sub(topic: string, fn: () => {}): void
  pub(topic: string, ...args: any[]): void
  unsub(topic: string, fn: () => {}): void
}

export const Pubsub: PubsubModel = {
  topicMap: {},
  sub(topic: string, fn: () => {}) {
    const entry = this.topicMap[topic] || (this.topicMap[topic] = [])

    entry.push(fn)
  },
  pub(topic: string, ...args: any[]) {
    const entry = this.topicMap[topic]
    if (!entry) return

    entry.forEach((handler: Function) => handler(...args))
  },
  unsub(topic: string, fn: () => {}) {
    const entry = this.topicMap[topic]
    const idx = entry.indexOf(fn)
    entry.splice(idx, 1)
  }
}

type EventModel = PubsubModel['topicMap']

class PubSub {
  events: EventModel
  constructor() {
    // 维护事件及订阅行为
    this.events = {}
  }
  /**
   * 注册事件订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  subscribe(type: string, cb: Function) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(cb)
  }
  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表
   */
  publish(type: string, ...args: any[]) {
    if (this.events[type]) {
      this.events[type].forEach((cb) => {
        cb(...args)
      })
    }
  }
  /**
   * 移除某个事件的一个订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  unsubscribe(type: string, cb: Function) {
    if (this.events[type]) {
      const targetIndex = this.events[type].findIndex((item) => item === cb)
      if (targetIndex !== -1) {
        this.events[type].splice(targetIndex, 1)
      }
      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
  }
  /**
   * 移除某个事件的所有订阅行为
   * @param {String} type 事件类型
   */
  unsubscribeAll(type: string) {
    if (this.events[type]) {
      delete this.events[type]
    }
  }
}

export default new PubSub()
