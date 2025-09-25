# Quick Streamlit Integration Setup (30 mins)

## Step 1: Place Your Model File
```bash
# Put your trained model in the project root
cp /path/to/your/cow_breed_model.pth ./cow_breed_model.pth
```

## Step 2: Update Model Class in Streamlit App
The `example_streamlit_app.py` is already updated to use your `CowBreedClassifier` with MobileNetV2 architecture and 20 breed classes.

## Step 3: Verify Breed Names
Your 20 breed classes are already configured:
```python
CLASS_NAMES = [
    'bhadawari', 'deoni', 'gaolao', 'gir', 'hallikar', 'hariana',
    'jaffrabadi_buffalo', 'kankrej', 'khillari', 'krishna_valley',
    'mehsana_buffalo', 'murrah_buffalo', 'nagpuri_buffalo',
    'nili_ravi_buffalo', 'ongole', 'red_sindhi', 'sahiwal',
    'surti_buffalo', 'tharparkar', 'umblachery'
]
```

## Step 4: Install Dependencies & Run
```bash
# Install required packages
pip install streamlit torch torchvision pillow matplotlib opencv-python numpy

# Run Streamlit app
streamlit run example_streamlit_app.py --server.port 8501
```

## Step 5: Test Integration
1. Start your React app: `npm run dev`
2. Navigate to Breed Identification page
3. Click "Show Live AI Demo" button
4. Your PyTorch model will load in the iframe!

## Demo Flow for Judges
1. **Upload image in Streamlit iframe** → shows real AI predictions
2. **Switch to main dashboard** → navigate through all modules
3. **Highlight**: "This is our working AI model embedded in our production dashboard"

## File Structure
```
project/
├── src/                              # React Dashboard
│   ├── components/
│   │   ├── breed-identification/
│   │   │   └── BreedIdentification.tsx   # Has iframe integration
│   │   ├── dashboard/
│   │   └── ui/
│   └── pages/
├── example_streamlit_app.py             # Your AI model (iframe ready)
├── cow_breed_model.pth                  # Your trained model
└── streamlit_setup.md                   # This guide
```

✅ **Ready for Demo**: Your real PyTorch model runs inside the dashboard!