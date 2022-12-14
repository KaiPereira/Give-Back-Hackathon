from extensions import skillExtractor

def skill_get(desc):
    skill_ls = []
    annotations = skillExtractor.annotate(desc)["results"]

    try:
        fm = annotations["full_matches"][0]
    except IndexError:
        return ["job experience"]
    ng = annotations["ngram_scored"]

    skill_ls.append(fm["doc_node_value"])

    for i in ng:
        skill_ls.append(i["doc_node_value"])

    return skill_ls
