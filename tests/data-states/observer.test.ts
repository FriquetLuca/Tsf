import * as tsf from "../../src";
import { testPage } from "../tester"

type DummyNotif = {
  notify: boolean
}

testPage({
  title: "Observer",
  tests: [
    {
      type: "normal",
      title: "Create an object where you can get notification from using subscription",
      expect: () => {
        let observerA = {
          notify: false,
          name: "Harry"
        }
        const notifyHarry = (notification: DummyNotif) => {
          observerA.notify = notification.notify
        }
        let observerB = {
          notify: false,
          name: "John"
        }
        const notifyJohn = (notification: DummyNotif) => {
          observerB.notify = notification.notify
        }
        const targetToObserve = tsf.createObserver<DummyNotif>()
        targetToObserve.subscribe(notifyHarry)
        targetToObserve.subscribe(notifyJohn)
        targetToObserve.notify({
          notify: true
        })
        return observerA.notify && observerB.notify
      },
      equal: true,
    },
    {
      type: "normal",
      title: "An observer can unsubscribe from a target so it won't get notification anymore",
      expect: () => {
        let observerA = {
          notify: false,
          name: "Harry"
        }
        const notifyHarry = (notification: DummyNotif) => {
          observerA.notify = notification.notify
        }
        let observerB = {
          notify: false,
          name: "John"
        }
        const notifyJohn = (notification: DummyNotif) => {
          observerB.notify = notification.notify
        }
        const targetToObserve = tsf.createObserver<DummyNotif>()
        targetToObserve.subscribe(notifyHarry)
        targetToObserve.subscribe(notifyJohn)
        targetToObserve.unsubscribe(notifyHarry)
        targetToObserve.notify({
          notify: true
        })
        return observerA.notify || !observerB.notify
      },
      equal: false,
    }
  ]
})
