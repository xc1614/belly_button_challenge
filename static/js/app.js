const queryUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
  d3.json(queryUrl).then(function(data) {
    console.log(data)
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

// Call the initiation function
init();


function optionChanged(selectedId) {
  // Implement your logic to update the charts and metadata based on the selected ID

  d3.json(queryUrl).then(function(data) {
    // Extract the necessary data
    let samples = data.samples;

    // Filter the samples data for the selected ID
    let selectedSample = samples.filter(function(sample) {
      return sample.id === selectedId;
    })[0];

    // Create the horizontal bar chart
    let barData = [{
      type: 'bar',
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      orientation: 'h'
    }];

    let barLayout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };

    Plotly.newPlot('bar', barData, barLayout);

    // Create the bubble chart
    let bubbleData = [{
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
        colorscale: 'Earth'
      }
    }];

    let bubbleLayout = {
      title: 'Bubble Chart',
      xaxis: { title: 'OTU IDs'},
      yaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  

    let metadatas = data.metadata;

    let selectedMetaData = metadatas.filter(function(metadata) {
      return String(metadata.id) === String(selectedId);
    })[0];
    showInfo(selectedMetaData)

  });
}

function showInfo(data) {
  console.log(data)
  // clear #sample-metadata
  let metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html("");


  // set values to #sample-metadata

  // Loop through the metadata and append key-value pairs to the panel
  Object.entries(data).forEach(function([key, value]) {
    metadataPanel
      .append("p")
      .text(`${key}: ${value}`);
  });
}