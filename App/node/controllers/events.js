// controllers/events.js
export class EventController {
  constructor({ eventModel }) {
    this.eventModel = eventModel;
  }

  async getEventsByEmployeeId(req, res) {
    try {
      console.log("getEventsByEmployeeId");
      const { employeeId } = req.params;
      const events = await this.eventModel.getEventsByEmployeeId(employeeId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    const event = req.body;
    try {
      const newEvent = await this.eventModel.create(event);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    const { eventId } = req.params;
    try {
      await this.eventModel.remove(eventId);
      res.status(200).json({ message: "Event deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
