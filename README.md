# Soloen-Electric-Meter-System-Simulation

## I. Design: 
- Electric Meter CPU uses **C++** as its embedded language. Then, data structures in this simulation are inspired by **C++ data structures**, e.g., **Struct**, **List**,...

- Data structure of the practical packet: 
```C++
struct E_LevelID {
	int level;
	int id;
}

struct E_NodeID {
	E_LevelID* levelID;
	string iPAddress;
}

struct E_Packet {
	E_NodeID* startingNodeID;
	E_NodeID* destinationNodeID;
	string: data;
	E_NodeID* routing;
}
```
