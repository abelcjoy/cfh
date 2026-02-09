const axios = require('axios');
const fs = require('fs');

async function fetchHuggingFaceDatasets() {
    console.log('🔍 Scout Deployed... Hunting for Waste Datasets on HuggingFace...');

    // HuggingFace API is public and free!
    const searchUrl = 'https://huggingface.co/api/datasets?search=waste&sort=downloads&direction=-1&limit=20';

    try {
        const response = await axios.get(searchUrl);
        const data = response.data;

        const hfDatasets = data.map(ds => ({
            title: ds.id.split('/')[1] || ds.id, // Extract name from 'user/dataset'
            url: `https://huggingface.co/datasets/${ds.id}`,
            source: "HuggingFace",
            images: "Unknown", // API doesn't always give image count easily
            updated: new Date(ds.lastModified).getFullYear().toString(),
            description: `Official HuggingFace Dataset. Downloads: ${ds.downloads}`
        }));

        console.log(`✅ Found ${hfDatasets.length} datasets on HuggingFace.`);
        return hfDatasets;

    } catch (error) {
        console.error('❌ Error fetching HuggingFace:', error.message);
        return [];
    }
}

async function fetchAllDatasets() {

    // 1. Get Real Data from HuggingFace
    const hfData = await fetchHuggingFaceDatasets();

    // 2. Keep our curated "Gold Standard" list (Kaggle/Roboflow)
    const curatedDatasets = [
        {
            title: "Waste Classification Data",
            url: "https://www.kaggle.com/datasets/techsash/waste-classification-data",
            source: "Kaggle",
            images: "25k+",
            updated: "2024",
            description: "Organic vs Recyclable items. Good baseline."
        },
        {
            title: "Garbage Classification (12 Classes)",
            url: "https://www.kaggle.com/datasets/mostafaabla/garbage-classification",
            source: "Kaggle",
            images: "15k",
            updated: "2023",
            description: "Battery, biological, brown-glass, cardboard, clothes, green-glass, metal, paper, plastic, shoes, trash, white-glass."
        },
        {
            title: "TACO: Trash Annotations in Context",
            url: "http://tacodataset.org/",
            source: "External",
            images: "10k+",
            updated: "Ongoing",
            description: "The gold standard for litter detection in the wild."
        },
        {
            title: "Waste Pictures (Medical & Domestic)",
            url: "https://www.kaggle.com/datasets/wangziic/waste-pictures",
            source: "Kaggle",
            images: "24k",
            updated: "2024",
            description: "High variety of common domestic waste items."
        },
        {
            title: "Recyclable Waste (YOLO Format)",
            url: "https://universe.roboflow.com/material-identification/garbage-classification-3",
            source: "Roboflow",
            images: "3k",
            updated: "2025",
            description: "Pre-labeled for YOLO. Ready to train."
        }
    ];

    // Combine them
    const allDatasets = [...curatedDatasets, ...hfData];

    // Save
    const output = {
        updatedAt: new Date().toISOString(),
        totalDatasets: allDatasets.length,
        datasets: allDatasets
    };

    fs.writeFileSync('datasets.json', JSON.stringify(output, null, 2));
    console.log(`🎉 Success! Cataloged ${allDatasets.length} datasets to datasets.json`);
}

fetchAllDatasets();
