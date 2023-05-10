SELECT
  fc.feat_id,
  MAX(fr.rank) AS achieved_feat_rank
FROM feat_completion fc
JOIN feat_rank fr ON fr.id = fc.feat_rank_id
WHERE fc.user_id = $1
GROUP BY fc.feat_id