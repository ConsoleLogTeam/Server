import { Service } from "typedi";

@Service("scheduler")
export default class SchedulerService {
    async ResetRemainingClasses() {
        console.log("Implementation to reset remaining classes");
    }
}
