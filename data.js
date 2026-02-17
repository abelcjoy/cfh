const hardwareCurriculum = [
    {
        id: "robotics-tech",
        title: "Industrial Robotics Technician",
        icon: "🤖",
        description: "Master the maintenance and repair of 6-axis industrial arms (Fanuc, KUKA, ABB).",
        gear_required: ["Multimeter", "Wire Strippers", "Basic Servo Motor Kit (for simulation)"],
        quests: [
            { level: 1, title: "Safety First: The E-Stop Circuit", search_term: "Industrial Robot Dual Channel Safety Circuit E-Stop wiring", task: "Draw a dual-channel E-Stop wiring diagram." },
            { level: 2, title: "Anatomy of an Arm", search_term: "6 Axis Robot Anatomy J1-J6", task: "Identify J1 through J6 on a diagram of a Fanuc R-2000iB." },
            { level: 3, title: "The Teach Pendant", search_term: "Fanuc Teach Pendant Jogging Tutorial", task: "Watch how to jog a robot in Joint vs World mode." },
            { level: 4, title: "Mastering/Calibration", search_term: "Robot Mastering Zero Position Calibration", task: "Explain why a robot loses its 'home' position." },
            { level: 5, title: "Grease & Maintenance", search_term: "Harmonic Drive Grease Change Robot", task: "List the signs of a failing harmonic drive." },
            { level: 6, title: "Servo Motors & Encoders", search_term: "AC Servo Motor Encoder Feedback Pulse", task: "Explain the difference between incremental and absolute encoders." },
            { level: 7, title: "Deadman Switch Logic", search_term: "3-position enabling device switch logic", task: "Why does the robot stop if you squeeze too hard?" },
            { level: 8, title: "IO Communication", search_term: "Robot Digital I/O wiring PNP vs NPN", task: "Diagram a sensor connected to a Robot Input." },
            { level: 9, title: "Tool Center Point (TCP)", search_term: "Robot TCP 4 Point Method", task: "Explain the triangulation math used to define a tool tip." },
            { level: 10, title: "Collision Detection", search_term: "Robot Collision Guard Sensitivity", task: "How does the robot know it hit something without a touch sensor?" },
            // ... Levels 11-20 would go here
        ]
    },
    {
        id: "plc-specialist",
        title: "PLC Controls Specialist",
        icon: "⚡",
        description: "Program the brains of the factory. Ladder logic and automation control.",
        gear_required: ["Siemens LOGO! or Click PLC", "24V Power Supply", "Push Buttons", "LEDs"],
        quests: [
            { level: 1, title: "Sink vs Source", search_term: "PLC Sinking vs Sourcing wiring", task: "Wire a button to an input correctly." },
            { level: 2, title: "Normally Open/Closed", search_term: "NO vs NC contact logic", task: "Wire a Fail-Safe circuit (NC)." },
            { level: 3, title: "Ladder Logic Basics", search_term: "Ladder Logic Basic Instructions XIC XIO OTE", task: "Write a program: Button A turns on Light B." },
            { level: 4, title: "Timers (TON/TOF)", search_term: "PLC Timer On Delay logic", task: "Program: Button hold for 3s -> Light On." },
            { level: 5, title: "Counters (CTU/CTD)", search_term: "PLC Counter Up Down instructions", task: "Program: Light turns on after 5 button presses." },
            { level: 6, title: "Interlocks", search_term: "Motor reversing interlock logic", task: "Prevent Motor Forward and Reverse from engaging at same time." },
            { level: 7, title: "HMI Basics", search_term: "HMI to PLC communication mapping", task: "Create a virtual button on screen that lights a physical LED." },
            { level: 8, title: "VFD Control", search_term: "PLC analog output 4-20mA VFD speed", task: "Explain how 4-20mA controls motor speed." },
            { level: 9, title: "Troubleshooting", search_term: "PLC Force I/O safety", task: "Why is 'Forcing' an input dangerous?" },
            { level: 10, title: "Sequencers", search_term: "PLC Sequencer Logic Traffic Light", task: "Program a 3-stage traffic light sequence." }
        ]
    },
    {
        id: "drone-repair",
        title: "Drone Diagnostics & Repair",
        icon: "🚁",
        description: "Fix the commercial and agricultural drone fleet.",
        gear_required: ["Soldering Station", "Broken Drone Frame", "Multimeter"],
        quests: [
            { level: 1, title: "The Flight Stack", search_term: "Drone FC ESC Motor Receiver Diagram", task: "Draw the connection map of a quadcopter." },
            { level: 2, title: "Soldering Basics", search_term: "How to tin wires soldering", task: "Solder two wires together perfectly." },
            { level: 3, title: "Motor Diagnostics", search_term: "Brushless motor continuity test multimeter", task: "Test a motor for a shorted winding." },
            { level: 4, title: "ESC Troubleshooting", search_term: "Bad ESC symptoms drone", task: "Identify the sound of a Desync." },
            { level: 5, title: "Battery Safety", search_term: "LiPo battery internal resistance checking", task: "Measure the IR of a cell." }
        ]
    },
    {
        id: "microsoldering",
        title: "Microsoldering Specialist",
        icon: "🔬",
        description: "Board-level repair for laptops, phones, and controllers.",
        gear_required: ["Hot Air Rework Station", "Microscope (or digital)", "Flux", "Tweezers"],
        quests: [
            { level: 1, title: "Tools of the Trade", search_term: "Hot air rework station basics", task: "Set the correct temp/airflow." },
            { level: 2, title: "Component ID", search_term: "SMD Capacitor vs Resistor visual ID", task: "Find a 0402 capacitor on a junk board." },
            { level: 3, title: "Desoldering", search_term: "Remove SMD component hot air", task: "Remove a chip without melting a plastic connector." },
            { level: 4, title: "Resoldering", search_term: "Drag soldering techniques", task: "Solder a chip back on." },
            { level: 5, title: "Trace Repair", search_term: "PCB jumper wire trace repair", task: "Bridge a broken connection with wire." }
        ]
    },
    {
        id: "solar-tech",
        title: "Solar & Battery Tech",
        icon: "☀️",
        description: "Maintain the renewable grid.",
        gear_required: ["Multimeter (High Voltage Rated)", "Crimping Tool (MC4)"],
        quests: [
            { level: 1, title: "Series vs Parallel", search_term: "Solar panel string voltage calculation", task: "Calculate Volts/Amps for 4 panels in series." },
            { level: 2, title: "The Inverter", search_term: "Solar inverter MPPT explained", task: "Draw where the DC goes in and AC comes out." },
            { level: 3, title: "Connectors", search_term: "MC4 connector cramping tutorial", task: "Make a watertight MC4 connection." },
            { level: 4, title: "Rapid Shutdown", search_term: "NEC 2017 rapid shutdown requirements", task: "Explain why panels need to turn off." },
            { level: 5, title: "Battery Balancing", search_term: "LiFePO4 battery top balancing", task: "Explain why cells drift apart." }
        ]
    },
    // The "Locked" Roles (To be expanded)
    {
        id: "cobot-integrator",
        title: "Cobot Integrator",
        icon: "🤝",
        description: "Deploy and teach collaborative robots (Universal Robots, Techman) to work safely with humans.",
        gear_required: ["Cobot Simulation Software (URSim)", "Digital Calipers"],
        quests: [
            { level: 1, title: "Safety Planes", search_term: "Universal Robots safety plane configuration", task: "Restrict the robot's workspace to avoid a wall." },
            { level: 2, title: "Force Limiting", search_term: "Cobot force limiting sensitivity settings", task: "Configure the robot to stop on a 50N impact." },
            { level: 3, title: "Waypoint Teaching", search_term: "Freedrive mode Universal Robots tutorial", task: "Hand-guide the robot to 3 points and loop it." },
            { level: 4, title: "Palletizing Wizard", search_term: "Universal Robots palletizing wizard tutorial", task: "Program a 3x3x3 box stacking pattern." },
            { level: 5, title: "End Effector Setup", search_term: "Robotiq gripper URCap installation", task: "Install a vacuum gripper driver." }
        ]
    },
    {
        id: "agv-mechanic",
        title: "AGV Fleet Mechanic",
        icon: "🚜",
        description: "Maintain autonomous mobile robots in warehouses (Amazon/Ocado style).",
        gear_required: ["Laser Cleaning Kit", "Multimeter", "Metric Hex Keys"],
        quests: [
            { level: 1, title: "Lidar Hygiene", search_term: "SICK safety lidar cleaning procedure", task: "Clean a lidar lens without scratching it." },
            { level: 2, title: "Charging Contacts", search_term: "AGV charging shoe maintenance", task: "Sand and measure resistance on spring contacts." },
            { level: 3, title: "Wheel Odometry", search_term: "AGV encoder wheel slip error", task: "Explain why worn tires cause navigation errors." },
            { level: 4, title: "WIFI Roaming", search_term: "AGV wifi roaming threshold RSSI", task: "Diagnose a dead spot in the warehouse." },
            { level: 5, title: "E-Stop Chain", search_term: "AGV bumper safety circuit", task: "Trace a broken wire in the bumper strip." }
        ]
    },
    {
        id: "ev-tech",
        title: "EV High-Voltage Tech",
        icon: "⚡",
        description: "Diagnose and repair electric vehicle battery packs and inverters.",
        gear_required: ["CAT III 1000V Multimeter", "HV Gloves (Class 0)", "Insulated Tools"],
        quests: [
            { level: 1, title: "HV Safety", search_term: "EV High Voltage Disable Procedure", task: "Pull the Service Disconnect plug safely." },
            { level: 2, title: "Isolation Testing", search_term: "Insulation resistance testing megohmmeter EV", task: "Test for HV leakage to chassis." },
            { level: 3, title: "Contactor Logic", search_term: "EV battery contactor precharge circuit", task: "Explain why the main relay clicks twice." },
            { level: 4, title: "Cell Balancing", search_term: "EV battery BMS passive balancing", task: "Identify a weak cell block via OBDII." },
            { level: 5, title: "Resolver Calibration", search_term: "EV motor resolver offset calibration", task: "Calibrate the motor position sensor." }
        ]
    },
    {
        id: "wind-tech",
        title: "Wind Turbine Tech",
        icon: "🌬️",
        description: "Climb and fix the mechanical/hydaulic systems of wind turbines.",
        gear_required: ["Climbing Harness", "Grease Gun", "Torque Wrench"],
        quests: [
            { level: 1, title: "Yaw System", search_term: "Wind turbine yaw brake maintenance", task: "Check the brake pads on the yaw drives." },
            { level: 2, title: "Pitch Control", search_term: "Blade pitch hydraulic accumulator check", task: "Test the nitrogen pressure in the accumulators." },
            { level: 3, title: "Gearbox Oil", search_term: "Wind turbine gearbox oil sampling analysis", task: "Take an oil sample to check for metal shavings." },
            { level: 4, title: "Slip Ring", search_term: "Wind turbine slip ring brushes cleaning", task: "Clean the carbon dust from the generator slip ring." },
            { level: 5, title: "Ladder Safety", search_term: "Wind turbine climb assist adjustment", task: "Inspect the cable grab system." }
        ]
    },
    {
        id: "3d-print-tech",
        title: "3D Printer Tech",
        icon: "🖨️",
        description: "Keep industrial FDM/SLA farms running 24/7.",
        gear_required: ["Calipers", "Hex Keys", "Needles (Nozzle cleaning)"],
        quests: [
            { level: 1, title: "Bed Leveling", search_term: "3D printer manual mesh bed leveling", task: "Get a perfect first layer test pattern." },
            { level: 2, title: "Cold Pull", search_term: "Atomic method cold pull nozzle cleaning", task: "Unclog a nozzle without removing it." },
            { level: 3, title: "E-Steps", search_term: "Calibrate extruder E-steps", task: "Ensure 100mm request = 100mm actual filament." },
            { level: 4, title: "PID Tuning", search_term: "Marlin PID autotune hotend", task: "Stabilize hotend temperature fluctuations." },
            { level: 5, title: "Belt Tension", search_term: "3D printer belt frequency tuning app", task: "Tighten belts to the correct Hz." }
        ]
    },
    {
        id: "smart-building",
        title: "Smart Building IoT",
        icon: "🏢",
        description: "Integrate HVAC, Lighting, and Access Control.",
        gear_required: ["Laptop", "Ethernet Crimper", "Screwdriver"],
        quests: [
            { level: 1, title: "Protocols", search_term: "BACnet vs Modbus basics", task: "Explain the difference between the two giants." },
            { level: 2, title: "Thermostat Wiring", search_term: "C-wire thermostat explanation", task: "Why does a smart thermostat need 24V common?" },
            { level: 3, title: "Mesh Networks", search_term: "Zigbee mesh network repeating", task: "Map out router vs end-device placement." },
            { level: 4, title: "Access Control", search_term: "Wiegand protocol card reader wiring", task: "Wire a badge reader to a controller." },
            { level: 5, title: "PoE Power", search_term: "Power over Ethernet voltage drop calculation", task: "Calculate if a camera needs a PoE+ injector." }
        ]
    },
    {
        id: "fiber-splicer",
        title: "Fiber Optic Splicer",
        icon: "🌐",
        description: "Fusion splice and test the glass backbone of the internet.",
        gear_required: ["Fiber Stripper", "Cleaver", "Fusion Splicer (Simulated)"],
        quests: [
            { level: 1, title: "Single vs Multi", search_term: "Single mode vs Multimode fiber core size", task: "Identify yellow vs orange cables." },
            { level: 2, title: "Stripping", search_term: "Fiber optic stripping 3 hole tool", task: "Strip the jacket, buffer, and coating." },
            { level: 3, title: "Cleaving", search_term: "Fiber optic cleave bad angle symptoms", task: "Why does a bad cleave fail the splice?" },
            { level: 4, title: "Splicing", search_term: "Fujikura fusion splicer tutorial", task: "Watch the arc fusion process." },
            { level: 5, title: "Testing (OTDR)", search_term: "Reading OTDR trace events", task: "Find the break distance on a graph." }
        ]
    },
    {
        id: "bmet",
        title: "Biomedical Tech",
        icon: "🏥",
        description: "Repair life-saving hospital equipment.",
        gear_required: ["Electrical Safety Analyzer", "Pressure Gauge"],
        quests: [
            { level: 1, title: "Electrical Safety", search_term: "NFPA 99 electrical safety testing hospital", task: "Test chassis leakage current." },
            { level: 2, title: "Infusion Pumps", search_term: "IV pump flow rate calibration", task: "Verify the pump delivers exactly 100ml/hr." },
            { level: 3, title: "Patient Monitors", search_term: "ECG simulator testing patient monitor", task: "Simulate a heart rhythm." },
            { level: 4, title: "Defibrillators", search_term: "Defibrillator energy discharge test", task: "Measure the joules delivered into a dummy load." },
            { level: 5, title: "Documentation", search_term: "Medical device preventative maintenance log", task: "Fill out a PM tag correctly." }
        ]
    },
    {
        id: "vertical-farm",
        title: "Vertical Farming Tech",
        icon: "🥬",
        description: "Maintain the hydroponic systems of the future.",
        gear_required: ["pH Meter", "EC Meter", "PVC Cutter"],
        quests: [
            { level: 1, title: "Nutrient Dosing", search_term: "Peristaltic pump calibration hydroponics", task: "Calibrate a pump to dose 5ml/min." },
            { level: 2, title: "Sensors", search_term: "EC sensor calibration conductivity", task: "Calibrate your Electro-Conductivity probe." },
            { level: 3, title: "Lighting", search_term: "PPFD measurement grow lights", task: "Measure the light intensity at leaf level." },
            { level: 4, title: "Plumbing", search_term: "PVC gluing primer cement technique", task: "Glue a watertight joint." },
            { level: 5, title: "Airflow", search_term: "HVAC VPD (Vapor Pressure Deficit) farming", task: "Calculate if the air is too dry for plants." }
        ]
    },
    {
        id: "haptic-vr",
        title: "Haptic/VR Hardware",
        icon: "👓",
        description: "Fix the immersion gear (Headsets, Feedback Suits).",
        gear_required: ["Precision Screwdriver Set", "Air Duster"],
        quests: [
            { level: 1, title: "Lenses", search_term: "VR lens fresnel cleaning scratches", task: "Polish a scratched lens (Polywatch)." },
            { level: 2, title: "Tracking", search_term: "SteamVR base station laser failure fix", task: "Diagnose a 'red blinking light' on a lighthouse." },
            { level: 3, title: "Controllers", search_term: "Analog stick drift fix potentiometer cleaning", task: "Clean the sensor to stop drift." },
            { level: 4, title: "Haptics", search_term: "Linear resonant actuator LRA testing", task: "Test the vibration motor." },
            { level: 5, title: "Cables", search_term: "Fiber optic tether cable replacement VR", task: "Replace a damaged 3-in-1 cable." }
        ]
    },
    {
        id: "space-marine",
        title: "Space Hardware",
        icon: "🚀",
        description: "The ultimate frontier. Radiation hardening and vacuum lubrication.",
        gear_required: ["Vacuum Chamber (DIY)", "Kapton Tape"],
        quests: [
            { level: 1, title: "Outgassing", search_term: "NASA outgassing data low volatility materials", task: "Why can't you use WD-40 in space?" },
            { level: 2, title: "Rad Hardening", search_term: "Radiation hardening by design latchup", task: "Explain Single Event Latchup." },
            { level: 3, title: "Thermal Vacuum", search_term: "Thermal vacuum testing cycling", task: "Why do solders crack in orbit?" },
            { level: 4, title: "Clean Room", search_term: "ISO 5 cleanroom gowning procedure", task: "Put on a bunny suit correctly." },
            { level: 5, title: "Wire Wrapping", search_term: "NASA workmanship standard wire wrap", task: "Perform a NASA-standard wire wrap." }
        ]
    }
];
