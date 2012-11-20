function SolarInstallation {

	this.photovoltaicArea 					= 20; 				// m2
	this.thermalArea 						= 0;

	// Panel specific default values. User can view and change if necessary.
	this.photovoltaicPeakPowerFactor 		= 0.15;
	this.photovoltaicInstallationFactor 	= 0.75;				// Depends on the installation. Value 0.75 is applicable when the panel is moderately ventilated

	// Roof specific values from database
	this.roofId 							= 79;
	this.roofArea 							= 172.42000000000; 	// m2
	this.roofAreaTotalIrradiance 			= 134919.06250000; 	// kWh/year
	this.roofAreaAvgIrradiance 				= 782.50200000000; 	// kWh/(m2 year)
	this.roofGoodArea						= 59.087844848600;	// m2
	this.roofGoodAreaAvgIrradiance			= 993.66731527800;	// kWh/(m2 year)
	this.roofGoodAreaTotalIrradiance		= 58713.660156300;	// kWh/(year)
}