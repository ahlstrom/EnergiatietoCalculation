function SystemHotWaterHeatingEnergyBalance(system,constants) {
	var hour;
	var day;
	var index;
	var systemConsumptionProfile = new Profile();
	var systemProductionProfile = new Profile();
	var systemBalanceProfile = new Profile();
	var elementProfile = new Profile();
	for(hour=0;hour<8760;hour++) {
		systemConsumptionProfile.profile[hour] = 0.0;
	}
	for(hour=0;hour<8760;hour++) {
		systemProductionProfile.profile[hour] = 0.0;
	}	
	for(index=0;index<system.building.length;index++) {
		elementProfile = HotWaterHeatingEnergyProfile(system.building[index],constants);
		for(hour=0;hour<8760;hour++) {
			systemConsumptionProfile.profile[hour] += elementProfile.profile[hour];
		}
	}
	for(index=0;index<system.solarInstallation.length;index++) {
		elementProfile = SolarHeatingEnergyProductionProfile(system.solarInstallation[index],constants);
		for(hour=0;hour<8760;hour++) {
			systemProductionProfile.profile[hour] += elementProfile.profile[hour];
		}
	}
	SystemBoreholeLoadSharing(system,constants);
	for(index=0;index<system.borehole.length;index++) {
		elementProfile = BoreholeHotWaterHeatingEnergyProductionProfile(system,system.borehole[index],constants);
		for(hour=0;hour<8760;hour++) {
			systemProductionProfile.profile[hour] += elementProfile.profile[hour];
		}
	}
	for(hour=0;hour<8760;hour++) {
		systemBalanceProfile.profile[hour] = systemConsumptionProfile.profile[hour] - systemProductionProfile.profile[hour];
	}
	return systemBalanceProfile;
}