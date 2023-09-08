import weights from '../assets/data/weights'
let categories = [['Hip hop music', 'Pop music', 'Rock', 'Country music', 'Indie rock', 'Jazz', 'Punk rock', 'Heavy metal', 'Alternative rock', 'R&B', 'Blues', 'Trap music', 'Techno', 'EDM', 'Reggae', 'Emo', 'Dubstep', 'Pop rap', 'Classic rock', 'Vaporwave', 'Electronic music', 'Pop rock', 'Hard rock', 'Hyperpop', 'danceable', 'lively', 'valence', 'energetic', 'high tempo', 'speechiness', 'instrumentalness', 'acoustic', 'mode', 'extended duration', 'lyricism', 'instrumentation', 'vocalism', 'complex arrangement'], ['street/urban', 'art deco', 'avant-garde', 'digital', 'surrealism', 'industrial', 'realism', 'modern', 'emphasis on crisp edges', 'high contrast design', 'cool overtones', 'warm overtones', 'soft pastel hues', 'bold typography', 'subtle gradients', 'monochromatic design', 'symmetrical design', 'minimalist design', 'earth tones', 'patterned'], ['confident', 'warm', 'human', 'soulful', 'energetic vibe', 'ethereal', 'nostalgic', 'introspective', 'passionate', 'serene', 'playful', 'raw', 'bold', 'timeless', 'captivating', 'dreamy', 'empathetic', 'powerful', 'enigmatic', 'harmonious', 'eclectic', 'hopeful', 'empowering', 'bittersweet', 'magnetic', 'whimsical', 'intimate', 'electric', 'heartfelt', 'reflective', 'triumphant', 'soothing']]

categories = [categories[0].map(entry=>entry.toLowerCase()),categories[1].map(entry=>entry.toLowerCase()),categories[2].map(entry=>entry.toLowerCase())]

export function calculateWeightedSimilarityScore(array1, array2, category = "blank") {
  array1 = array1.map(entry=>{
    entry.descriptor = entry.descriptor.toLowerCase()
    return entry
  })
  array2 = array2.map(entry=>{
    entry.descriptor = entry.descriptor.toLowerCase()
    return entry
  })
    let totalWeight = 0;
    let weightedScore = 0;

    if (category!=="blank") {
      array1 = array1.filter((entry)=>

        {
        if (category==='sonic') {
          return categories[0].includes(entry.descriptor.toLowerCase())
        } else if (category==='visual') {
          return categories[1].includes(entry.descriptor.toLowerCase())
        }
      })
    }
    for (const obj1 of array1) {
        const { descriptor, value: value1 } = obj1;

        const weight = weights.data.find((entry)=>{
          return entry.descriptor.toLowerCase() === descriptor.toLowerCase()}).weight
        const matchingObj2 = array2.find(obj2 => obj2.descriptor.toLowerCase() === descriptor.toLowerCase());

        if (matchingObj2) {
            const { value: value2 } = matchingObj2;
            weightedScore += weight * Math.abs(value1 - value2);
            totalWeight += weight;
        }
    }

    if (totalWeight === 0) {
        return 0;
    }

    const similarityScore = 1 - (weightedScore / totalWeight);
    return similarityScore;
}

export function findClosestDescriptor(array1, array2, array3) {
  array1 = array1.filter(obj =>
    array3.some(refObj =>
      refObj.descriptor.toLowerCase() === obj.descriptor.toLowerCase()
    )
  );
  array2 = array2.filter(obj =>
    array3.some(refObj =>
      refObj.descriptor.toLowerCase() === obj.descriptor.toLowerCase()
    )
  );

  const allDescriptors = [...new Set([...array1, ...array2, ...array3].map(obj => obj.descriptor.toLowerCase()))];
  
  const distances = allDescriptors.map(descriptor => {
    const values = [
      array1.find(obj => obj.descriptor.toLowerCase() === descriptor.toLowerCase())?.value || 0,
      array2.find(obj => obj.descriptor.toLowerCase() === descriptor.toLowerCase())?.value || 0,
      array3.find(obj => obj.descriptor.toLowerCase() === descriptor.toLowerCase())?.value || 0
    ];
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    const squaredDifferences = values.map(value => (value - average) ** 2);
    const totalDistance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0);
    return { descriptor, totalDistance };
  });

  distances.sort((a, b) => b.totalDistance - a.totalDistance);
  let returnValues = []
  returnValues = distances.map(entry=>entry.descriptor.toLowerCase())
  return returnValues.splice(0,3);
}
export function findDistinctions(artistData,selectedBrand="all",brandData=[],category="none") {
  console.log(category) 

  if(category!=="none") {
    if (category==='sonic') {
          artistData = artistData.filter(entry=>categories[0].includes(entry.descriptor.toLowerCase()))
        } else if (category==='visual') {
          artistData = artistData.filter(entry=>categories[1].includes(entry.descriptor.toLowerCase()))
        }
  }

  let descriptorDict = {};

  if (selectedBrand!=="all") {
    for (const entry of brandData) {
      const descriptor = entry.descriptor.toLowerCase();
      const value = entry.value;
      descriptorDict[descriptor] = value;
    }
  }

  const preprogrammedData = {"hip hop music":65.83,"pop music":85,"rock":41.67,"country music":33.33,"indie rock":48.33,"jazz":35,"punk rock":32.5,"heavy metal":21.67,"alternative rock":47.5,"r&b":63.33,"blues":36.67,"trap music":68.33,"techno":36.67,"eDM":47.5,"reggae":43.33,"emo":40,"dubstep":26.67,"pop rap":64.17,"classic rock":40,"vaporwave":33.33,"electronic music":53.33,"pop rock":64.17,"hard rock":31.67,"hyperpop":53.33,"danceable":83.33,"lively":77.5,"valence":75,"energetic":84.17,"high tempo":70,"speechiness":67.5,"instrumentalness":35.83,"acoustic":45,"mode":66.67,"extended duration":55,"lyricism":73.33,"instrumentation":61.67,"vocalism":76.67,"complex arrangement":65,"street\/urban":68.33,"art deco":31.67,"avant-garde":33.33,"digital":58.33,"surrealism":48.33,"industrial":30,"realism":53.33,"modern":66.67,"emphasis on crisp edges":55,"high contrast design":60,"cool overtones":71.67,"warm overtones":68.33,"soft pastel hues":45,"bold typography":73.33,"subtle gradients":56.67,"monochromatic design":61.67,"symmetrical design":61.67,"minimalist design":65,"earth tones":50,"patterned":51.67,"confident":82.5,"warm":70.83,"human":81.67,"soulful":76.67,"energetic vibe":84.17,"ethereal":53.33,"nostalgic":53.33,"introspective":63.33,"passionate":79.17,"serene":60,"playful":75.83,"raw":55,"bold":73.33,"timeless":65,"captivating":76.67,"dreamy":61.67,"empathetic":76.67,"powerful":77.5,"enigmatic":51.67,"harmonious":70,"eclectic":60,"hopeful":75.83,"empowering":79.17,"bittersweet":58.33,"magnetic":71.67,"whimsical":66.67,"intimate":73.33,"electric":65.83,"heartfelt":76.67,"reflective":70,"triumphant":75.83,"soothing":58.33}

    const furthestDescriptors = [];

    for (const item of artistData) {
        const descriptor = item.descriptor.toLowerCase();
        const value = item.value;
        let category
        if (categories[0].includes(item.descriptor.toLowerCase())) {
          category = 'sonic'
        } else if (categories[1].includes(item.descriptor.toLowerCase())) {
          category = 'visual'
        } else if (categories[2].includes(item.descriptor.toLowerCase())) {
          category = 'vibe'
        }

        let artistVal = item.value;
        let brandVal = descriptorDict[descriptor];
        let preprogrammedValue;

        if (selectedBrand === "all") {
          preprogrammedValue = preprogrammedData[descriptor.toLowerCase()];
        } else {
          preprogrammedValue = descriptorDict[descriptor.toLowerCase()]
        }

        const difference = Math.abs(value - preprogrammedValue);
        
        let direction
        if ((value - preprogrammedValue) / difference>0) {
          direction = 'higher'
        } else {
          direction = 'lower'
        }
        
        
        furthestDescriptors.push({ descriptor, difference,category,direction,artistVal,brandVal });
    }

    furthestDescriptors.sort((a, b) => b.difference - a.difference);

    return furthestDescriptors.slice(0, 3);

}