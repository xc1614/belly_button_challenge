const queryUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
  d3.json(queryUrl).then(function(data) {
    // Extract the necessary data
    let samples = data.samples;

    // Create the dropdown menu
    let dropdown = d3.select("#selDataset");

    // Populate the dropdown options with sample IDs
    dropdown
      .selectAll("option")
      .data(samples)
      .enter()
      .append("option")
      .text(function(d) {
        return d.id;
      })
      .attr("value", function(d) {
        return d.id;
      });

    // Call optionChanged function with the first ID
    optionChanged(samples[0].id);
  });
}

// Function to handle dropdown change event
function optionChanged(selectedId) {
  // Implement your logic to update the charts and metadata based on the selected ID
  // ...

  console.log("Selected ID:", selectedId);
}

// Call the initiation function
init();