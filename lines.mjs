// A line is a visual text row. Blank items do not create rows.
export function groupLines(items, transform) {
 const points=items.map((item,index)=>{const t=transform(item.transform);return {index,text:item.str,x:t[4],y:t[5],height:Math.hypot(t[2],t[3])||10};}).filter(p=>p.text.trim());
 points.sort((a,b)=>a.y-b.y||a.x-b.x);
 const rows=[];
 for(const p of points){let row=rows.at(-1);if(!row||Math.abs(p.y-row.y)>Math.max(2,Math.min(p.height,row.height)*.28)){row={y:p.y,height:p.height,items:[]};rows.push(row)}row.items.push(p);}
 const mapping=new Map();rows.forEach((row,i)=>row.items.forEach(p=>mapping.set(p.index,i+1)));
 return {rows,mapping};
}
