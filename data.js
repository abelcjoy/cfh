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
    { id: "cobot-integrator", title: "Cobot Integrator", icon: "🤝", locked: true, quests: [] },
    { id: "agv-mechanic", title: "AGV Fleet Mechanic", icon: "🚜", locked: true, quests: [] },
    { id: "ev-tech", title: "EV High-Voltage Tech", icon: "⚡", locked: true, quests: [] },
    { id: "wind-tech", title: "Wind Turbine Tech", icon: "🌬️", locked: true, quests: [] },
    { id: "3d-print-tech", title: "3D Printer Tech", icon: "🖨️", locked: true, quests: [] },
    { id: "smart-building", title: "Smart Building IoT", icon: "🏢", locked: true, quests: [] },
    { id: "fiber-splicer", title: "Fiber Optic Splicer", icon: "🌐", locked: true, quests: [] },
    { id: "bmet", title: "Biomedical Tech", icon: "🏥", locked: true, quests: [] },
    { id: "vertical-farm", title: "Vertical Farming Tech", icon: "🥬", locked: true, quests: [] },
    { id: "haptic-vr", title: "Haptic/VR Hardware", icon: "👓", locked: true, quests: [] }
];
