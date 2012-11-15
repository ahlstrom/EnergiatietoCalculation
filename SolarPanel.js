function SolarPanel {


	this.area = 20;									// m2

	// Panel specific default values. User can view and change if necessary.
	this.electricityPeakPowerFactor = 0.15;
	this.electricityInstallationFactor = 0.75;		// Depends on the installation. Value 0.75 is applicable when the panel is moderately ventilated

	// Roof specific values from database
	this.roofArea;
	this.roofAreaTotalRadiation;
	this.roofAreaAvgRadiation;
	this.roofGoodArea;
	this.foorGoodAreaAvgRadiation;
}
