// Require:
// Constants.js
// Profile.js
// System.js
// Borehole.js
// SystemSpaceHeatingEnergyConsumption.js
// SystemHotWaterHeatingEnergyConsumption.js


function BoreholeSpaceHeatingEnergyProductionProfile(system,borehole,constants) {
	var profile = new Profile();
	var hour;
	var systemHeatingEnergyConsumption = new Profile();
	var systemSpaceHeatingEnergyConsumption = SystemSpaceHeatingEnergyConsumption(system,constants);
	var systemHotWaterHeatingEnergyConsumption = SystemHotWaterHeatingEnergyConsumption(system,constants);

	SystemBoreholeLoadSharing(system,constants);

	for(hour=0;hour<8760;hour++) {
		systemHeatingEnergyConsumption.profile[hour] = systemSpaceHeatingEnergyConsumption.profile[hour] + systemHotWaterHeatingEnergyConsumption.profile[hour];
	}

	for(hour=0;hour<8760;hour++) {
		if(borehole.loadShare * systemHeatingEnergyConsumption.profile[hour] <= borehole.maxOutPower) {
			profile.profile[hour] = borehole.loadShare * systemSpaceHeatingEnergyConsumption.profile[hour];
		} else {
			profile.profile[hour] = (borehole.maxOutPower / (borehole.loadshare * systemHeatingEnergyConsumption.profile[hour])) * systemSpaceHeatingEnergyConsumption.profile[hour];
		}
	}

	return profile;
}


function BoreholeHotWaterHeatingEnergyProductionProfile(system,borehole,constants) {
	var profile = new Profile();
	var hour;
	var systemHeatingEnergyConsumption = new Profile();
	var systemSpaceHeatingEnergyConsumption = SystemSpaceHeatingEnergyConsumption(system,constants);
	var systemHotWaterHeatingEnergyConsumption = SystemHotWaterHeatingEnergyConsumption(system,constants);

	for(hour=0;hour<8760;hour++) {
		systemHeatingEnergyConsumption.profile[hour] = systemSpaceHeatingEnergyConsumption.profile[hour] + systemHotWaterHeatingEnergyConsumption.profile[hour];
	}

	for(hour=0;hour<8760;hour++) {
		if(borehole.loadShare * systemHeatingEnergyConsumption.profile[hour] <= borehole.maxOutPower) {
			profile.profile[hour] = borehole.loadShare * systemHotWaterHeatingEnergyConsumption.profile[hour];
		} else {
			profile.profile[hour] = (borehole.maxOutPower / (borehole.loadshare * systemHeatingEnergyConsumption.profile[hour])) * systemHotWaterHeatingEnergyConsumption.profile[hour];
		}
	}

	return profile;
}


function BoreholeElectricityConsumptionProfile(system,borehole,constants) {
	var profile = new Profile();
	var hour;
	var systemHeatingEnergyConsumption = new Profile();
	var systemSpaceHeatingEnergyConsumption = SystemSpaceHeatingEnergyConsumption(system,constants);
	var systemHotWaterHeatingEnergyConsumption = SystemHotWaterHeatingEnergyConsumption(system,constants);

	var tGroundLoopK = constants.ctokelvin + borehole.tGroundLoop;		// Kelvin	
	var tOutHotWaterK = constants.ctokelvin + borehole.tOutHotWater; 	// Kelvin
	var tOutSpaceK;														// Kelvin
	var copSpace;
	var copHotWater;

	var space;
	var hotWater;

	for(hour=0;hour<8760;hour++) {
		systemHeatingEnergyConsumption.profile[hour] = systemSpaceHeatingEnergyConsumption.profile[hour] + systemHotWaterHeatingEnergyConsumption.profile[hour];
	}

	for(hour=0;hour<8760;hour++) {
		if(borehole.loadShare * systemHeatingEnergyConsumption.profile[hour] <= borehole.maxOutPower) {
			space = borehole.loadShare * systemSpaceHeatingEnergyConsumption.profile[hour];
		} else {
			space = (boreholeMaxOutPower / (borehole.loadshare * systemHeatingEnergyConsumption.profile[hour])) * systemSpaceHeatingEnergyConsumption.profile[hour];
		}
		if(borehole.loadShare * systemHeatingEnergyConsumption.profile[hour] <= borehole.maxOutPower) {
			hotWater = borehole.loadShare * systemSpaceHeatingEnergyConsumption.profile[hour];
		} else {
			hotWater = (boreholeMaxOutPower / (borehole.loadshare * systemHeatingEnergyConsumption.profile[hour])) * systemHotWaterHeatingEnergyConsumption.profile[hour];
		}

		if (constants.vantaaReferenceYearOutsideTemperature[hour] > borehole.tOutSpaceMinAt) {
			tOutSpaceK = constants.ctokelvion + borehole.tOutSpaceMin;
		} else if (constants.vantaaReferenceYearOutsideTemperature[hour] < borehole.tOutSpaceMaxAt) {
			tOutSpaceK = constants.ctokelvion + borehole.tOutSpaceMax;
		} else {
			tOutSpaceK = constants.ctokelvion + borehole.tOutSpaceMin + ((constants.vantaaReferenceYearOutsideTemperature[hour] - borehole.tOutSpaceMinAt) * (borehole.tOutSpaceMax - borehole.tOutSpaceMin) / (borehole.tOutSpaceMaxAt - borehole.tOutSpaceMinAt));
		}
		copSpace = borehole.efficiencyFactor * tOutSpaceK / (tOutSpaceK - tGroundLoopK);
		copHotWater = borehole.efficiencyFactor * tOutHotwaterK / (tOutHotwaterK - tGroundLoopK);

		profile.profile[hour] = space / copSpace + hotWater / copHotWater;

	}

	return profile;
}


function SystemBoreholeLoadSharing (system,constants) {

	var systemProductionCapacityYear = 0.0;

	var systemHeatingEnergyConsumption = new Profile();
	var systemSpaceHeatingEnergyConsumption = SystemSpaceHeatingEnergyConsumption(system,constants);
	var systemHotWaterHeatingEnergyConsumption = SystemHotWaterHeatingEnergyConsumption(system,constants);

	for(index=0;index<system.borehole.length;index++) {
		systemProductionCapacityYear += system.borehole[index].activeDepth * BoreholeCapacityContinuous(system.borehole[index],constants) * 8760;
	}

document.getElementById("debug").innerHTML += "<br>Continuous capacity: " + systemProductionCapacityYear;

	for(hour=0;hour<8760;hour++) {
		systemHeatingEnergyConsumption.profile[hour] = systemSpaceHeatingEnergyConsumption.profile[hour] + systemHotWaterHeatingEnergyConsumption.profile[hour];
	}

document.getElementById("debug").innerHTML += "<br>System total consumption: " + systemHeatingEnergyConsumption.year();

	if(systemProductionCapacityYear <= systemHeatingEnergyConsumption.year()) {
		for(index=0;index<system.borehole.length;index++) {
			system.borehole[index].loadShare = system.borehole[index].activeDepth * BoreholeCapacityContinuous(system.borehole[index],constants) * 8760 / systemHeatingEnergyConsumption.year();
			system.borehole[index].maxOutPower = (system.borehole[index].powerDimensioning / 100) * system.borehole[index].loadShare * systemHeatingEnergyConsumption.yearMax();
		}
	} else {
		for(index=0;index<system.borehole.length;index++) {
			system.borehole[index].loadShare = system.borehole[index].activeDepth * BoreholeCapacityContinuous(system.borehole[index],constants) * 8760 / systemProductionCapacityYear;
			system.borehole[index].maxOutPower = (system.borehole[index].powerDimensioning / 100) * system.borehole[index].loadShare * systemHeatingEnergyConsumption.yearMax();
		}
	}
}


function BoreholeCapacityContinuous(borehole,constants) {
	var capacity;
	var thermalConductivity = constants.bedrockThermalConductivity[borehole.bedrockTypeId];
	capacity = 2 * Math.PI * thermalConductivity * (constants.bedrockUndisturbedTemp - borehole.wallTemp);
	capacity /= Math.log(borehole.activeDepth / borehole.diameter);
	capacity /= 1000;
	return capacity;
}