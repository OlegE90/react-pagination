React pagination.

npm i --save react-pagination-main

<p>// Direction.<br>
enum EDirection {<br>
RIGHT = ‘RIGHT’,<br>
LEFT = ‘LEFT’,<br>
}</p>
<p>// @prop {number} activePage Current page.<br>
// @prop {number} totalPageRange Total pages.<br>
// @prop {number} pageRangeDisplayed Count of displaying pages.<br>
// @prop {Function} onChange The handler of changing position.<br>
// @prop {Function} [renderRowOneStep] Render row for one step (Right &amp;&amp; Left).<br>
// @prop {Function} [renderRowLast] Render row to last page (Right &amp;&amp; Left).<br>
interface IProps {<br>
activePage: number;<br>
totalPageRange: number;<br>
pageRangeDisplayed: number;<br>
onChange: (page: number) =&gt; void;<br>
renderRowOneStep?: (row: EDirection) =&gt; JSX.Element;<br>
renderRowLast?: (row: EDirection) =&gt; JSX.Element;<br>
}</p>