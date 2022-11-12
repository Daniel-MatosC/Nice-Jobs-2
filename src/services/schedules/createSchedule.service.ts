import { IScheduleRequest } from "../../interfaces/schedules/index";
import { Schedules } from "../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Services } from "../../entities/services.entity";

const createScheduleService = async (
  schedule: IScheduleRequest,
  userID: string
) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(User);
  const serviceRepository = AppDataSource.getRepository(Services);

  if (!schedule) {
    throw new AppError("Check the required fields");
  }

  if(schedule.date == ""){
    throw new AppError("Date is required");
  }
  if(schedule.date.length>12){
    throw new AppError("Date is invalid");
  }
  const dateFormat = new Date(schedule.date).getDay()
  console.log( new Date(schedule.date).toDateString());
  
  if(dateFormat == 0 || dateFormat == 6){
    throw new AppError(`${new Date(schedule.date).toDateString()} - Bussiness is closed on weekends`);
  }

  if(schedule.hour == ""){
    throw new AppError("Hour is required");
  }
  if(schedule.hour.length>9){
    throw new AppError("Hour is invalid");
  }

  const user = await userRepository.findOneBy({ id: userID });

  if (!user) {
    throw new AppError("User not found");
  }
  const hour = parseInt(schedule.hour.split(" : ")[0])


  if (hour < 8 || hour >= 22) {
    throw new AppError("Schedule during business hours",400);
  }
  const service = await serviceRepository.findOneBy({
    id: schedule.serviceId,
  });

  if (!service) {
    throw new AppError("Service not found",400);
  }

  const scheduleExists = await scheduleRepository.findOne({
    where: {
      date: schedule.date,
      hour: schedule.hour,
    },
  });
  if (scheduleExists) {
    throw new AppError("Date or hour already exists", 403);
  }

  const schedueleInstance = new Schedules();
  const newSchedule = scheduleRepository.create({
    ...schedueleInstance,
    ...schedule,
    user: user,
    services: service,
  });

  await scheduleRepository.save(newSchedule);

  const { password, ...rest } = service.user;
  return {
    ...service,
    user: rest,
  };
  return newSchedule;
};

export default createScheduleService;
