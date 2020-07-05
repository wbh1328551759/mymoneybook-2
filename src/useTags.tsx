import {useState} from 'react';
import {createId} from 'lib/createId';

const defaultTags = [
  {id: createId(), name: '衣'},
  {id: createId(), name: '食'},
  {id: createId(), name: '住'},
  {id: createId(), name: '行'},
];

const useTags = () => { //封装一个自定义 Hook
  const [tags, setTags] = useState<{ id: number, name: string }[]>(defaultTags);
  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0];
  const finTagIndex = (id: number) => {
    let result = -1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateTag = (id: number, obj: { name: string }) => {
    const index = findTag(id);
    const tagClone = JSON.parse(JSON.stringify(tags));
    tagClone.splice(index, 1, {id: id, name: obj.name});
    setTags(tagClone);
  };
  const deleteTag = (id: number) => {
    const index = findTag(id);
    const tagClone = JSON.parse(JSON.stringify(tags));
    tagClone.splice(index, 1)
    setTags(tagClone)
  }
  return {
    tags: tags,
    setTags: setTags,
    findTag: findTag,
    updateTag: updateTag,
    finTagIndex: finTagIndex,
    deleteTag: deleteTag
  };
};

export {useTags};